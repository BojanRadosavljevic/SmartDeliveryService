import { useEffect, useRef, useState } from "react";
import { BlackLightTheme } from "../CSSComponents/BackgroundThemes";
import { CenaDiv, DugmeDiv, DugmiciButton, InfoDiv, InfoDiv2, InfoLabel, NaslovniDiv, SlikaImg, SlikaStatusDiv, StartniDiv } from "../CSSComponents/DostavljacPageCSS/DostavljacMainPageCSS";
import { DostavljacHeader } from "../Outlets/DostavljacHeader";
import axios from "axios";
import { PaketInfo } from "../Models/PaketInfo";
import { useSelector } from "react-redux";
import { RootState } from "../AppStore/store";
import { useSignalR } from "../Providers/SignalRProvider";
import { Status } from "../assets/Status";
import { DostavaDTO } from "../Models/DostavaDTO";
import { fakturePath, imagesPath } from "../assets/Paths";
import { HiArrowUpTray } from "react-icons/hi2";
import { ImageModal } from "../Modals/ImageModals";

export function DostavljacMainPage(){
    const user = useSelector((state: RootState)=>state.auth.user);
    const [paketi,setPaketi] = useState<PaketInfo[]>([]);
    const [dostava,setDostava] = useState<DostavaDTO | string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [showModal,setShowModal] = useState(false);
    const {connection} = useSignalR();

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
        
            if (response.status === 200 && connection?.state === "Connected") {
              await connection.invoke("SendNotification", item.idKorisnika, "📦 Vaša dostava je uspešno preuzeta!");
              await axios.post("http://localhost:5233/Obavestenje/postaviObavestenje",null,{
                params:{
                    userId: item.idKorisnika,
                    message: "📦 Vaša dostava je uspešno preuzeta!"
                }
              });
             window.location.reload();
            }
          } catch (error) {
            console.error("❌ Greška prilikom prihvatanja paketa:", error);
          }
    }
    async function vratiTrenutnuDostavu(){
        var response = await axios.get("http://localhost:5233/Dostava/vratiTrenutnuDostavu",{params:{
            idDostavljaca : user?.id
        }});
        setDostava(response.data);
    }
    async function otkaziDostavu(){
        if(typeof dostava !== "string" && dostava!=null && Status(dostava.status)!=="Preuzeto"){
            var response = await axios.delete("http://localhost:5233/Dostava/otkaziDostavu",{
                params:{
                    idDostave : dostava.id
                }
            });
           
            if (response.status === 200 && connection?.state === "Connected") {
                await connection.invoke("SendNotification", dostava.idKorisnika, "📦 Vaša dostava je otkazana!");
                await axios.post("http://localhost:5233/Obavestenje/postaviObavestenje",null,{
                  params:{
                      userId: dostava.idKorisnika,
                      message: "📦 Vaša dostava je otkazana!"
                  }
                });
            window.location.reload();
            } 
        }
    }
    async function izvrsiDostavu(){
        if(typeof dostava !== "string" && dostava!=null){
            var response = await axios.put("http://localhost:5233/Dostava/izvrsiDostavu",null,{
                params:{
                    idDostave : dostava.id
                }
            });

            if (response.status === 200 && connection?.state === "Connected") {
                await connection.invoke("SendNotification", dostava.idKorisnika, "📦 Vaša dostava je izvršena!");
                await axios.post("http://localhost:5233/Obavestenje/postaviObavestenje",null,{
                  params:{
                      userId: dostava.idKorisnika,
                      message: "📦 Vaša dostava je izvršena!"
                  }
                });
            window.location.reload();
            } 
        }
    }
    const handleClick = () => {
        inputRef.current?.click();
      };
    async function uploadFakture(event : React.ChangeEvent<HTMLInputElement>){
        const file = event.target.files?.[0];
        if(!file) return;

        const formData = new FormData();
        if (typeof dostava !== "string" && dostava!=null) {
            formData.append("id", dostava.id);
          
            formData.append("slika",file);
            try{
                const response = await axios.post("http://localhost:5233/Dostava/UploadSlike", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                dostava.pdFfaktura = response.data.url;
                setDostava(dostava);
                window.location.reload(); 
            }catch(err){
                console.error("Greska pri uploadu slike",err);
            }
        }
    }

    useEffect(()=>{
        vratiPaketeBezDostave();
        vratiTrenutnuDostavu();
    },[]);
    return(
    <BlackLightTheme>
        <DostavljacHeader/>
        <StartniDiv>
            {dostava==""?
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
            {typeof dostava === "object"?
                (<div>
                    <SlikaStatusDiv>
                        {dostava.pdFfaktura!=="a"?
                        ( <SlikaImg src={`${fakturePath()}${dostava.pdFfaktura}`}  onClick={()=>{setShowModal(!showModal)}} />):
                        (<div>
                            <HiArrowUpTray style={{marginLeft: "20px",border:"1px dotted white",borderRadius:"3px",cursor:"pointer",padding:"2px"}} size={30} onClick={handleClick}/>
                            <input type="file" accept="image/*" ref={inputRef} style={{ display: "none" }} onChange={uploadFakture}/>
                        </div>)}
                        <h3 style={{marginRight: "20px"}}>{Status(dostava.status)?.toUpperCase()}</h3>
                    </SlikaStatusDiv>
                    {showModal && 
                    <ImageModal imageUrl={`${fakturePath()}${dostava.pdFfaktura}`} onClose={()=>setShowModal(false)}/>}
                    <InfoDiv>
                        <InfoDiv2>
                            <InfoLabel>Ime:</InfoLabel>
                            <text>{dostava.ime} {dostava.prezime}</text>
                        </InfoDiv2>
                        <InfoDiv2>
                            <InfoLabel>Broj telefona:</InfoLabel>
                            <text>{dostava.brojTelefona}</text>
                        </InfoDiv2>
                        <InfoDiv2>
                            <InfoLabel>Adresa za dostavu:</InfoLabel>
                            <text>{dostava.adresaZaDostavu}</text>
                        </InfoDiv2>
                    </InfoDiv>
                    <CenaDiv>
                        <h4>Cena:</h4>
                        <h4>{dostava.cena} dinara</h4>
                    </CenaDiv>
                    <DugmiciButton>
                        <button style={{width:"25vw"}} onClick={otkaziDostavu}>Otkaži dostavu</button>
                        <button style={{width:"25vw"}} onClick={izvrsiDostavu}>Izvrši dostavu</button>
                    </DugmiciButton>
                </div>):("")}
                
            </>)}
        </StartniDiv>
    </BlackLightTheme>
    );
}