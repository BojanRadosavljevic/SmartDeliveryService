import * as signalR from "@microsoft/signalr";
import { parseJwt } from "./Auth/AuthUtils";
import Cookies from "js-cookie";

export function createSignalRConnection(): signalR.HubConnection {
    const token = Cookies.get("Token") ?? "";
    const userId = parseJwt(token)?.id;
    console.log(userId);
    return new signalR.HubConnectionBuilder()
        .withUrl(`http://localhost:5233/notificationHub?userId=${userId}`, {
            withCredentials: true,
        })
        .withAutomaticReconnect()
        .build();
}