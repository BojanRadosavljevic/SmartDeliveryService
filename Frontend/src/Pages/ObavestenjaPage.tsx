import { useEffect, useState } from "react";
import { BlackLightTheme } from "../CSSComponents/BackgroundThemes";
import { ListaArtikala } from "../CSSComponents/KorisnikPageCSS/KorpaCSS";
import { PocetniDiv } from "../CSSComponents/KorisnikPageCSS/KorpaCSS";
import { KorisnikFooter } from "../Outlets/KorisnikFooter";
import { KorisnikHeader } from "../Outlets/KorisnikHeader";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../AppStore/store";
import { Obavestenje } from "../Models/Obavestenje";
import { ButtonsDiv, ObavestenjaDiv, ObavestenjeDiv } from "../CSSComponents/KorisnikPageCSS/ObavestenjaCSS";

export function ObavestenjaPage(){
    const user = useSelector((state: RootState) => state.auth.user);
    const [obavestenja,setObavestenja] = useState<Obavestenje[]>([]);
    
    async function vratiObavestenja(){
        var response = await axios.get("http://localhost:5233/Obavestenje/vratiObavestenja",{
            params:{
                userId:user?.id
            }
        });
        setObavestenja(response.data);
    }
    async function prebaciUProcitana(){
        console.log("a");
        var response = await axios.put("http://localhost:5233/Obavestenje/procitajObavestenja",null,{
            params:{
                userId:user?.id
            }
        });
        window.location.reload();
        setObavestenja(response.data);
    }
    async function obrisiObavestenja(){
        var response = await axios.delete("http://localhost:5233/Obavestenje/obrisiObavestenja",{
            params:{
                userId:user?.id
            }
        });
        window.location.reload();
        setObavestenja(response.data);
    }
    function vratiDatum(datum : Date){
        const datuma = new Date(datum);
        return datuma.getDate()+"."+(datuma.getMonth()+1)+"."+datuma.getFullYear();
    }
    useEffect(()=>{
        vratiObavestenja();
    },[])
    return(
    <BlackLightTheme>
      <KorisnikHeader/>
        <ListaArtikala style={{display:"flex",justifyContent:"space-between"}}>
            <ObavestenjaDiv>
            <b style={{font:"25px Arial white",alignSelf:"center",marginTop:"25px"}}>OBAVEŠTENJA</b>
            
                {obavestenja.map((item)=>(
                    <ObavestenjeDiv>
                        <div>{item.poruka}</div>
                        <div>{item.primalac.ime+" "+item.primalac.prezime+" "+vratiDatum(item.vremePoruke)}</div>
                    </ObavestenjeDiv>
                    ))}
            </ObavestenjaDiv>
            <ButtonsDiv>
                <button style={{width:"150px"}} onClick={()=>{prebaciUProcitana()}}>Procitaj sve</button>
                <button style={{width:"150px"}} onClick={()=>{obrisiObavestenja()}}>Obrisi sve</button>
            </ButtonsDiv>
        </ListaArtikala>
      <KorisnikFooter/>
    </BlackLightTheme>);
}