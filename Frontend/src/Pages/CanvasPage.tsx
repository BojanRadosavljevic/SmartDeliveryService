import { useEffect, useRef } from "react";
import { BlackLightTheme } from "../CSSComponents/BackgroundThemes";
import { KorisnikHeader } from "../Outlets/KorisnikHeader";
import { useNavigate } from "react-router-dom";
import { ButtonDiv, CanvasDiv, NaslovniH1 } from "../CSSComponents/KorisnikPageCSS/CanvasPageCSS";
import { KorisnikFooter } from "../Outlets/KorisnikFooter";
import SignatureCanvas from "react-signature-canvas";
import axios from "axios";
import { useSignalR } from "../Providers/SignalRProvider";
import { useSelector } from "react-redux";
import { RootState } from "../AppStore/store";

export function CanvasPage(){
    const navigate = useNavigate();
    const canvasRef = useRef<SignatureCanvas>(null);
    const {connection} = useSignalR();
    const user = useSelector((state : RootState)=>state.auth.user);

    function clear(){
        canvasRef.current?.clear();
    };
    async function save(){
        if(!canvasRef.current?.isEmpty()){
            const signature = canvasRef.current?.getCanvas().toDataURL("image/png");

            try{
                const formData = new FormData();
                if(signature){
                    formData.append("signature",signature);
                }
                const canvasId = localStorage.getItem("canvasId");
                if (canvasId) {
                    formData.append("id", canvasId);
                }
                const response = await axios.put(`http://${window.location.hostname}:5233/Dostava/ZatvoriDostavu`,formData,{
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                if(response.status==200 && connection?.state === "Connected"){
                    await connection.invoke("SendNotification", user?.id, "📦 Vaša dostava je zatvorena!");
                    await axios.post(`http://${window.location.hostname}:5233/Obavestenje/postaviObavestenje`,null,{
                        params:{
                            userId: user?.id,
                            message: "📦 Vaša dostava je zatvorena!"
                        }
                      });
                    localStorage.removeItem("canvasId");
                    navigate('/paketi');
                } 
            }catch(e){

            }
        }
    }
    
    useEffect(()=>{
        if(localStorage.getItem("canvasId")==null||localStorage.getItem("canvasId")==""){
            navigate('/paketi');
        }
    },[])
    return(<div>
        <BlackLightTheme>
            <KorisnikHeader/>
                <CanvasDiv>
                    <NaslovniH1>CANVAS za dostavu</NaslovniH1>
                    <SignatureCanvas ref={canvasRef} penColor="black" backgroundColor="white" 
                        canvasProps={{
                            style:{ width : '85vw', height : '80vh', border : '3px solid black', borderRadius: '5px'}
                          }}
                    />
                    <ButtonDiv>
                        <button onClick={save}>Sačuvaj potpis</button>
                        <button onClick={()=>{clear()}}>Očisti potpis</button>
                    </ButtonDiv>
                </CanvasDiv>
            <KorisnikFooter/>
        </BlackLightTheme>
    </div>);
}