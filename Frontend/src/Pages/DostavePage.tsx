import { useEffect, useState } from "react";
import { BlackLightTheme } from "../CSSComponents/BackgroundThemes";
import { NaslovniDiv, SlikaImg, SlikaStatusDiv, StartniDiv } from "../CSSComponents/DostavljacPageCSS/DostavljacMainPageCSS";
import { DostavljacHeader } from "../Outlets/DostavljacHeader";
import { DostavaDTO } from "../Models/DostavaDTO";
import { useSelector } from "react-redux";
import { RootState } from "../AppStore/store";
import axios from "axios";
import { fakturePath, pngPath } from "../assets/Paths";
import { ImageModal } from "../Modals/ImageModals";
import { Status } from "../assets/Status";

export function DostavePage(){
    const user = useSelector((state:RootState)=>state.auth.user);
    const [dostave,setDostave]=useState<DostavaDTO[]>([]);
    const [showModal,setShowModal] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string>("");


    async function vratiDostaveDostavljaca(){
        const response = await axios.get(`http://${window.location.hostname}:5233/Dostava/vratiDostaveDostavljaca`,{params:{
            idDostavljaca:user?.id
        }});
        setDostave(response.data);

    }
    useEffect(()=>{
        vratiDostaveDostavljaca();
    },[])
    return(
    <BlackLightTheme>
        <DostavljacHeader/>
        <StartniDiv>
            <NaslovniDiv>Moje Dostave</NaslovniDiv>
            <div style={{display:"flex",flexDirection:"column"}}>
                {dostave.map((items)=>(
                    <SlikaStatusDiv>
                        <div>
                            <SlikaImg src={`${fakturePath()}${items.pdFfaktura}`}onClick={()=>{setSelectedImageUrl(fakturePath()+items.pdFfaktura); setShowModal(!showModal)}} style={{marginLeft:"5px"}}/>
                        </div>
                        {showModal && <ImageModal imageUrl={selectedImageUrl} onClose={()=>setShowModal(false)}/>}
                        <div style={{marginRight:"50px"}}>
                            <div>{items.ime} {items.prezime} {Status(items.status)?.toUpperCase()}</div>
                            <div>{items.cena} dinara</div>
                        </div>
                        <div>
                            <SlikaImg src={`${pngPath()}${items.pngPotpisa}`}onClick={()=>{setSelectedImageUrl(pngPath()+items.pngPotpisa); setShowModal(!showModal)}} style={{marginLeft:"5px"}}/>
                        </div>
                        {showModal && <ImageModal imageUrl={selectedImageUrl} onClose={()=>setShowModal(false)}/>}
                    </SlikaStatusDiv>
                ))}
            </div>
        </StartniDiv>
    </BlackLightTheme>
    );
}