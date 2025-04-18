import { useEffect, useState } from "react";
import { BlackLightTheme } from "../CSSComponents/BackgroundThemes";
import { DugmeDiv, NaslovniDiv, StartniDiv } from "../CSSComponents/DostavljacPageCSS/DostavljacMainPageCSS";
import { DostavljacHeader } from "../Outlets/DostavljacHeader";
import axios from "axios";
import { PaketInfo } from "../Models/PaketInfo";
import { useSelector } from "react-redux";
import { RootState } from "../AppStore/store";
import { connection } from "../Signalr";

export function DostavljacMainPage(){
    const user = useSelector((state: RootState)=>state.auth.user);
    const [tip,setTip] = useState<number>(2);
    const [paketi,setPaketi] = useState<PaketInfo[]>([]);

    async function vratiPaketeBezDostave(){
        const response = await axios.get("http://localhost:5233/Paket/vratiPaketeBezDostave");
        setPaketi(response.data);
    }
    async function prihvatiPaket(item: PaketInfo){
        try {
            const response = await axios.post("http://localhost:5233/Dostava/napraviDostavu", null, {
              params: {
                paketId: item.id,
                dostavljacId: user?.id,
              },
            });
        
            if (response.status === 200 && connection.state === "Connected") {
              await connection.invoke("SendNotification", item.idKorisnika, "📦 Vaša dostava je uspešno preuzeta!");
              window.location.reload();
            }
          } catch (error) {
            console.error("❌ Greška prilikom prihvatanja paketa:", error);
          }
    }
    useEffect(()=>{
        vratiPaketeBezDostave();
    },[]);
    return(
    <BlackLightTheme>
        <DostavljacHeader/>
        <StartniDiv>
            {tip===2?
            (<>
                <NaslovniDiv>Slobodni paketi</NaslovniDiv>
                <div style={{height:" 75vh"}}>{paketi.map((item)=>
                    (<div style={{display:"flex", flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding: "5px",borderBottom: "1px solid white"}}>
                        <div>
                            <div style={{display:"flex", flexDirection:"row"}}>
                                <div>{item.ime} {item.prezime}</div>
                                <div style={{marginLeft:"15px"}}>{item.brojTelefona}</div>
                            </div>
                            <div style={{display:"flex", flexDirection:"row"}}>
                                <div>{item.adresaZaDostavu}</div>    
                                <div style={{marginLeft:"15px"}}>{item.cena}.00 dinara</div>
                            </div>
                        </div>
                        <div>
                            <button onClick={()=>prihvatiPaket(item)}>Prihvati paket</button>
                        </div>
                    </div>))}</div>
            </>)
            :(<>
            <NaslovniDiv>Trenutni paket</NaslovniDiv>
            <div></div>
            </>)}
            <div style={{display:"flex",justifyContent:"space-evenly"}}>
                    {tip===1?(<DugmeDiv style={{backgroundColor:"white"}}/>):(<DugmeDiv onClick={()=>setTip(1)}/>)}
                    {tip===2?(<DugmeDiv style={{backgroundColor:"white"}}/>):(<DugmeDiv onClick={()=>setTip(2)}/>)}
            </div> 
        </StartniDiv>
    </BlackLightTheme>
    );
}