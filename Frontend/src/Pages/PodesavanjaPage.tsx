import { useDispatch, useSelector } from "react-redux";
import { BlackLightTheme } from "../CSSComponents/BackgroundThemes";
import { ButtonDeo, InfoDiv, PocetniDiv, UnosDiv } from "../CSSComponents/PodesavanjaCSS";
import { KorisnikFooter } from "../Outlets/KorisnikFooter";
import { KorisnikHeader } from "../Outlets/KorisnikHeader";
import { RootState } from "../AppStore/store";
import { useState } from "react";
import axios from "axios";
import { logout, setUser } from "../Auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Providers/CartProvider";


export function PodesavanjaPage(){
    const {user,role} = useSelector((state:RootState)=> state.auth);
    const cart = useCart();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ime,setIme] = useState("");
    const [prezime,setPrezime] = useState("");
    const [brojTelefona,setBrojTelefona] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [adresaZaDostavu,setAdresaZaDostavu] = useState("");

    async function izmeniUsera(){
        const response = await axios.put("http://localhost:5233/User/izmeniUsera",{
            id: user?.id,
            ime: ime?ime:user?.ime,
            prezime: prezime?prezime:user?.prezime,
            brojTelefona: brojTelefona?brojTelefona:user?.brojTelefona,
            adresaZaDostavu: adresaZaDostavu?adresaZaDostavu:((user as any)?.adresaZaDostavu?(user as any)?.adresaZaDostavu:""),
            username: username?username:user?.username,
            password: password?password:user?.password,
            role:role
        },{headers:{"Content-Type":"application/json"}});
        dispatch(setUser(response.data));
        if(role=="korisnik"){
            navigate("/korisnik");
        }else{
            navigate("/dostavljac");
        }
    };
    async function obrisiUsera(){
        const response =  await axios.delete("http://localhost:5233/User/obrisiUsera",{params:{
            userId: user?.id
        }});
        cart.clearCart();
        dispatch(logout());
    };

    return (
    <>
    <BlackLightTheme>
        <KorisnikHeader/>
            <PocetniDiv>
                <b style={{font:"25px Arial white",alignSelf:"center",marginTop:"25px"}}>PODEŠAVANJA</b>
                <InfoDiv>
                    <UnosDiv>
                        <text>Ime:</text>
                        <input placeholder={`${user?.ime}`} onChange={(ev)=>setIme(ev.target.value)}/>
                    </UnosDiv>
                    <UnosDiv>
                        <text>Prezime:</text>
                        <input placeholder={`${user?.prezime}`} onChange={(ev)=>setPrezime(ev.target.value)}/>
                    </UnosDiv>
                    <UnosDiv>
                        <text>Broj Telefona:</text>
                        <input placeholder={`${user?.brojTelefona}`} onChange={(ev)=>setBrojTelefona(ev.target.value)}/>
                    </UnosDiv>
                    <UnosDiv>
                        <text>Username:</text>
                        <input placeholder={`${user?.username}`} onChange={(ev)=>setUsername(ev.target.value)}/>
                    </UnosDiv>
                    <UnosDiv>
                        <text>Password:</text>
                        <input placeholder={`${user?.password}`} onChange={(ev)=>setPassword(ev.target.value)}/>
                    </UnosDiv>
                    {role==="korisnik"?
                    (<UnosDiv>
                        <text>Adresa za Dostavu:</text>
                        <input placeholder={`${(user as any)?.adresaZaDostavu}`} onChange={(ev)=>setAdresaZaDostavu(ev.target.value)}/>
                    </UnosDiv>):""
                    }
                </InfoDiv>
                <div style={{display:"flex",justifyContent:"space-around",marginBottom:"15px"}}>
                    <ButtonDeo onClick={()=>izmeniUsera()}>Izmeni</ButtonDeo>
                    <ButtonDeo onClick={()=>obrisiUsera()}>Obrisi</ButtonDeo>
                </div>
            </PocetniDiv>
        <KorisnikFooter/>
    </BlackLightTheme>
    </>
    );
};