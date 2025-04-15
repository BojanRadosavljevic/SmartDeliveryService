import { ArtikalKolicina } from "./ArtikalKolicina";
import { Korisnik } from "./Korisnik";

export interface Paket{
    id: string;
    listaArtikala: ArtikalKolicina[];
    cena: number;
    PDFfaktura: string;
    korisnik: Korisnik;
}