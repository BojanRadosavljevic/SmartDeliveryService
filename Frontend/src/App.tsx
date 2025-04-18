import './App.css'
import { Route, Routes } from 'react-router-dom'
import { FrontPage } from './Pages/FrontPage'
import { LoginPage } from './Pages/LoginPage'
import { RegisterPage } from './Pages/RegisterPage'
import { KorisnikMainPage } from './Pages/KorisnikMainPage'
import ProtectedRoute from './Auth/ProtectedRoute'
import { DostavljacMainPage } from './Pages/DostavljacMainPage'
import { CartProvider } from './Providers/CartProvider'
import { KorpaPage } from './Pages/KorpaPage'
import { PodesavanjaPage } from './Pages/PodesavanjaPage'
import { useEffect } from 'react'
import { connection } from './Signalr'
import { showNotification } from './Notifications'

function App() {
  useEffect(() => {

    if (Notification.permission === "granted") {
      console.log("Notifikacije su omogućene!");
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Korisnik je dozvolio notifikacije!");
        }
      });
    }
    if (connection.state === "Disconnected") {
      connection
        .start()
        .then(() => {
          console.log("✅ SignalR konekcija uspostavljena");

          connection.on("ReceiveNotification", (message: string) => {
            console.log("📨 Poruka primljena:", message);
            showNotification("📢 Nova notifikacija: " + message);
          });
          
        })
        .catch((err) =>
          console.error("❌ Greška pri SignalR konekciji:", err)
        );
    }
  },[]);
  return (
    <>
    <Routes>
      <Route index element={<ProtectedRoute><FrontPage/></ProtectedRoute>}/>
      <Route path="/login" element={<ProtectedRoute><LoginPage/></ProtectedRoute>}/>
      <Route path="/register" element={<ProtectedRoute><RegisterPage/></ProtectedRoute>}/>
      <Route path="/korisnik" element={ <CartProvider><ProtectedRoute allowedRoles={["korisnik"]}><KorisnikMainPage/></ProtectedRoute> </CartProvider>}/>
      <Route path="/podesavanja" element={<CartProvider><ProtectedRoute allowedRoles={["korisnik","dostavljac"]}><PodesavanjaPage/></ProtectedRoute></CartProvider>}/>
      <Route path="/korpa" element={<CartProvider><ProtectedRoute allowedRoles={["korisnik"]}><KorpaPage/></ProtectedRoute> </CartProvider>}/>
      <Route path="/dostavljac" element={<ProtectedRoute allowedRoles={["dostavljac"]}><DostavljacMainPage/></ProtectedRoute>}/>
    </Routes>
    </>
  )
}

export default App
