import { useSelector } from "react-redux";
import { BlackLightTheme } from "../CSSComponents/BackgroundThemes";
import { KorisnikFooter } from "../Outlets/KorisnikFooter";
import { KorisnikHeader } from "../Outlets/KorisnikHeader";
import { RootState } from "../AppStore/store";
import { ListaArtikala } from "../CSSComponents/KorisnikPageCSS/KorpaCSS";
import { useEffect, useState } from "react";
import { ButtonDiv, ButtonPozadinaDiv, ItemDiv, NaslovniDiv, SelectedButtonDiv, SlikaDiv } from "../CSSComponents/KorisnikPageCSS/PaketiCSS";
import axios from "axios";
import { DostavaDTO } from "../Models/DostavaDTO";
import { PaketInfo } from "../Models/PaketInfo";
import { fakturePath } from "../assets/Paths";
import { ImageModal } from "../Modals/ImageModals";
import { Status } from "../assets/Status";

export function PaketiPage(){
    const user = useSelector((state:RootState)=>state.auth.user);
    const [paketi,setPaketi] = useState<PaketInfo[]>([]);
    const [dostave,setDostave] = useState<DostavaDTO[]>([]);
    const [selected,setSelected] = useState(false);
    const [showModal,setShowModal] = useState(false);

    async function vratiPaketeIDostave(){
        var response = await axios.get("http://localhost:5233/Paket/vratiPaketeBezDostaveUsera",{
            params:{
                idKorisnika:user?.id
            }
        });
        setPaketi(response.data);
        var response2 = await axios.get("http://localhost:5233/Dostava/vratiDostaveKorisnika",{
            params:{
                idKorisnika:user?.id
            }
        });
        setDostave(response2.data);
        console.log(dostave);
    }
    useEffect(()=>{
        vratiPaketeIDostave();
    },[]);

    return(<BlackLightTheme>
        <KorisnikHeader/>
            <ListaArtikala style={{display:"flex"}}>
                <ButtonPozadinaDiv>
                    {selected===false?(<SelectedButtonDiv>PAKETI</SelectedButtonDiv>):(<ButtonDiv onClick={()=>setSelected(!selected)}>PAKETI</ButtonDiv>)}
                    {selected===true?(<SelectedButtonDiv>DOSTAVE</SelectedButtonDiv>):(<ButtonDiv onClick={()=>setSelected(!selected)}>DOSTAVE</ButtonDiv>)}
                </ButtonPozadinaDiv>
                {selected === false?
                (<div>
                    <NaslovniDiv>PAKETI</NaslovniDiv>
                    <div>
                        {paketi.map((items)=>
                            (<ItemDiv>
                                
                                <div>   
                                    <SlikaDiv src={`${fakturePath}${items.pdFfaktura}`} onClick={()=>{setShowModal(!showModal)}} />
                                </div>
                                {showModal && <ImageModal imageUrl={`${fakturePath()}${items.pdFfaktura}`} onClose={()=>setShowModal(false)}/>}
                                <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                                    <div>{items.ime} {items.prezime}, {items.adresaZaDostavu}, {items.brojTelefona}, SPAKOVAN</div>
                                    <div>{items.cena} dinara </div>
                                </div>
                                
                            </ItemDiv>
                        ))}
                    </div>
                </div>):
                (<div>
                    <NaslovniDiv>DOSTAVE</NaslovniDiv>
                    <div>
                    {dostave.map((items)=>
                            (<ItemDiv>
                                
                                <div>   
                                    <SlikaDiv src={`${fakturePath()}${items.pdFfaktura}`} onClick={()=>{setShowModal(!showModal)}} />
                                </div>
                                 {showModal && <ImageModal imageUrl={`${fakturePath()}${items.pdFfaktura}`} onClose={()=>setShowModal(false)}/>}
                                <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",marginLeft:"10px"}}>
                                    <div>{items.ime} {items.prezime}, {items.adresaZaDostavu}, {items.brojTelefona},  {Status(items.status)?.toUpperCase()}</div>
                                    <div>{items.cena} dinara</div>
                                </div>
                                
                            </ItemDiv>
                        ))}
                    </div>
                </div>)}
                
            </ListaArtikala>
        <KorisnikFooter/>
    </BlackLightTheme>);
}