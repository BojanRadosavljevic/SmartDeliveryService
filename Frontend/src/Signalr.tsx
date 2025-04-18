import * as signalR from "@microsoft/signalr";
import { parseJwt } from "./Auth/AuthUtils";
import Cookies from "js-cookie";

function userId(){
    console.log(parseJwt(Cookies.get("Token")??"")?.id);
    return parseJwt(Cookies.get("Token")??"")?.id;

}
export const connection = new signalR.HubConnectionBuilder()
    .withUrl(`http://localhost:5233/notificationHub?userId=${userId()}`,{
        withCredentials: true,
    })
    .withAutomaticReconnect()
    .build();