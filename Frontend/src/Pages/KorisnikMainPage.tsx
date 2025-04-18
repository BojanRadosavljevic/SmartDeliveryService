import { useSelector } from "react-redux";
import { RootState } from "../AppStore/store";
import { BlackLightTheme } from "../CSSComponents/BackgroundThemes";
import { KorisnikHeader } from "../Outlets/KorisnikHeader";
import { KorisnikFooter } from "../Outlets/KorisnikFooter";
import { useEffect, useState } from "react";
import axios from "axios";
import { Artikal } from "../Models/Artikal";
import { ArtikalUListi, ButtonDeo, ItemsDeo, ListaArtikala, TestualniDeo } from "../CSSComponents/KorisnikPageCSS/ArtikalListaCSS";
import { imagesPath } from "../assets/Paths";
import { useCart } from "../Providers/CartProvider";

export function KorisnikMainPage(){
    const [artikli,setArtikli] = useState<Artikal[]>([]);
    const cart = useCart();
    const user = useSelector((state: RootState) => state.auth.user);
    async function vratiProizvode(){
      const response = await axios.get("http://localhost:5233/Artikal/vratiSveArtikle");
      setArtikli(response.data);
    }
    useEffect(() => {
      vratiProizvode();
      
    }, []);
    
    return (
      <BlackLightTheme>
        <KorisnikHeader/>
          <ListaArtikala>
            {
              artikli.map((item)=>(
                <ArtikalUListi>
                  <img src={`${imagesPath()}${item.slika}`} style={{maxWidth:"25vw",minWidth:"25vw",maxHeight:"15vh",minHeight:"15vh",borderRadius:"5px",objectFit: "fill"}}/>
                  <TestualniDeo>
                    <text style={{font:"30px Arial",marginLeft:"10px"}}>{item.naziv}</text>
                    <text style={{font:"25px Arial",marginLeft:"10px"}}>{item.opis}</text>
                    <text style={{font:"25px Arial",marginLeft:"10px"}}>Cena:  {item.cena} dinara</text>
                  </TestualniDeo>
                  <ButtonDeo>
                    <ItemsDeo onClick={()=>cart.addToCart(item)}>+</ItemsDeo>
                    <ItemsDeo>{cart.returnNumberOfArtical(item.id)}</ItemsDeo>
                    <ItemsDeo onClick={()=>cart.removeFromCart(item.id)}>-</ItemsDeo>
                  </ButtonDeo>
                </ArtikalUListi>
              ))
            }
          </ListaArtikala>
        <KorisnikFooter/>
      </BlackLightTheme>
    );
};