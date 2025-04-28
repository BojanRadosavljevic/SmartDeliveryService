import { useSelector } from "react-redux";
import { imagesPath } from "../assets/Paths";
import { BlackLightTheme } from "../CSSComponents/BackgroundThemes";
import { ArtikalUListi, ButtonDeo, FormaArtikala, ItemsDeo, ListaArtikala, PocetniDiv, TestualniDeo, UnosDeo } from "../CSSComponents/KorisnikPageCSS/KorpaCSS";
import { KorisnikFooter } from "../Outlets/KorisnikFooter";
import { KorisnikHeader } from "../Outlets/KorisnikHeader";
import { useCart } from "../Providers/CartProvider";
import { RootState } from "../AppStore/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSignalR } from "../Providers/SignalRProvider";

export function KorpaPage(){
    const cart = useCart();
    const user = useSelector((state: RootState)=>state.auth.user);
    const [adresaZaDostavu,setAdresaZaDostavu] = useState("");
    const navigate = useNavigate();
    const { connection } = useSignalR();

    async function napraviPaket(){
        const response = await axios.post("http://localhost:5233/Paket/dodajPaket",{
            listaArtikala: cart.cart,
            cena: cart.price,
            PDFfaktura: "a",
            adresaZaDostavu: adresaZaDostavu,
            korisnikId: user?.id
        },{headers:{"Content-Type":"application/json"}});
        cart.clearCart();
       
            if (response.status === 200 && connection?.state === "Connected") {
                
                await connection.invoke("SendNotification", user?.id, "📦 Vaša dostava je uspešno spakovana!");
                const response2 = await axios.post("http://localhost:5233/Obavestenje/postaviObavestenje",null,{
                    params:{
                        userId: user?.id,
                        message: "📦 Vaša dostava je uspešno spakovana!"
                    }
                });
                navigate('/korisnik');
            }
    };
    useEffect(() => {
        if (connection && connection.state !== "Connected") {
          connection.start().catch(err => console.error("Greška:", err));
        }
      }, [connection]);
    return(<BlackLightTheme>
        <KorisnikHeader/>
        <PocetniDiv>
            <ListaArtikala>
            {cart.cart.map((item)=>(
                 <ArtikalUListi>
                    <img src={`${imagesPath()}${item.artikal.slika}`} style={{maxWidth:"25vw",minWidth:"25vw",maxHeight:"15vh",minHeight:"15vh",borderRadius:"5px",objectFit: "fill"}}/>
                        <TestualniDeo>
                            <text style={{font:"30px Arial",marginLeft:"10px"}}>{item.artikal.naziv}</text>
                            <text style={{font:"25px Arial",marginLeft:"10px"}}>{item.artikal.opis}</text>
                            <text style={{font:"25px Arial",marginLeft:"10px"}}>Cena:  {item.artikal.cena} dinara</text>
                        </TestualniDeo>
                        <ButtonDeo>
                           <ItemsDeo onClick={()=>cart.addToCart(item.artikal)}>+</ItemsDeo>
                           <ItemsDeo>{cart.returnNumberOfArtical(item.artikal.id)}</ItemsDeo>
                           <ItemsDeo onClick={()=>cart.removeFromCart(item.artikal.id)}>-</ItemsDeo>
                           <text>{item.artikal.cena*item.brojArtikala}.00</text>
                        </ButtonDeo>
                 </ArtikalUListi>
                    ))}       
            </ListaArtikala>
            <FormaArtikala>
                <div style={{display:"flex",width: "95vw",height:"5vh",borderBottom:"2px solid white",justifyContent:"center",alignItems:"center",font:"30px Arial"}}>
                    Kupovina
                </div>
                <div style={{display:"flex",width: "95vw",height:"30vh",borderBottom:"2px solid white",alignItems:"center",justifyContent:"space-around",flexDirection:"column"}}>
                    <UnosDeo>
                        <text style={{display:"flex"}}>Adresa za dostavu:</text>
                        <input placeholder="Adresa za dostavu" style={{display:"flex",width: "50vw"}} onChange={(ev)=>setAdresaZaDostavu(ev.target.value)}></input>
                    </UnosDeo>
                </div>
                <div style={{display:"flex",width: "95vw",height:"10vh",justifyContent:"space-evenly",alignItems:"center"}}>
                    <text >Cena:   {cart.price}.00 dinara</text>
                    <button style={{display:"flex",width: "20vw",alignSelf:"center"}} onClick={()=>{napraviPaket()}}>Kupi</button>
                </div>
            </FormaArtikala>
        </PocetniDiv>
        <KorisnikFooter/>
    </BlackLightTheme>);
}