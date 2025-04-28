import { Dostavljac } from "./Dostavljac";
import { Paket } from "./Paket";

export interface Dostava{
    id : string,
    status : number,
    PNGPotpisa : string,
    paket : Paket,
    dostavljac : Dostavljac,
    vremeDostave : Date
}