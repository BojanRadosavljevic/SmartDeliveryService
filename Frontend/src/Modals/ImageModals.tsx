import { useEffect } from "react";
import { ImageDiv, ImageValue } from "../CSSComponents/DostavljacPageCSS/ImageModalCSS";

interface ImageModalProps{
    imageUrl : string;
    onClose : () => void;
}

export const ImageModal : React.FC<ImageModalProps> = ({ imageUrl , onClose })=>{
    useEffect(()=>{
        const handleKeyDown = (e: KeyboardEvent)=>{
            if(e.key === "Escape")
                onClose();   
        };
        window.addEventListener("keydown", handleKeyDown);
        return ()=>window.removeEventListener("keydown",handleKeyDown);
    },[onClose]);
    return(    
        <ImageDiv onClick={()=>onClose()}>       
            <ImageValue src={imageUrl} onClick={(e) => e.stopPropagation()}/>
        </ImageDiv>);
};