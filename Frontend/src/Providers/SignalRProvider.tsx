import { createContext, useContext, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { showNotification } from "../Notifications";
import { RootState } from "../AppStore/store";
import { useSelector } from "react-redux";

interface SignalRContextType{
    connection: signalR.HubConnection | null;
}

const SignalRContext = createContext<SignalRContextType>({connection : null});

export const useSignalR = () => useContext(SignalRContext);

export const SignalRProvider : React.FC<{children : React.ReactNode}> = ({children}) =>{
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const user = useSelector((state:RootState)=>state.auth.user);
    
    useEffect(() => {
        if (!user?.id) return;
        if (Notification.permission === "granted") {
            console.log("Notifikacije su omogućene!");
          } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                console.log("Korisnik je dozvolio notifikacije!");
              }
            });
          }

        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(`http://${window.location.hostname}:5233/notificationHub?userId=${user?.id}`, {
                withCredentials: true,
            })
            .withAutomaticReconnect()
            .build();

        newConnection
            .start()
            .then(() => {
                console.log("✅ SignalR konekcija uspostavljena");
                setConnection(newConnection);

                newConnection.on("ReceiveNotification", (message: string) => {
                    console.log("📨 Primljena poruka:", message);
                    showNotification("📢 Nova notifikacija: " + message);
                });
            })
            .catch((err) => {
                console.error("❌ Greška pri startovanju SignalR konekcije:", err);
            });

        return () => {
            newConnection.stop();
        };
    }, [user?.id]);

    return (
        <SignalRContext.Provider value={{ connection }}>
            {children}
        </SignalRContext.Provider>
    );
};