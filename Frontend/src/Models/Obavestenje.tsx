import { Korisnik } from "./Korisnik";

export interface Obavestenje{
    id : string,
    primalac : Korisnik,
    poruka : string,
    vremePoruke : Date,
    prociatana : boolean
}