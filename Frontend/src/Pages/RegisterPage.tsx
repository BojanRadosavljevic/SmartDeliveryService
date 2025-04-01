import { Link, useNavigate } from "react-router-dom";
import { BlackLightTheme } from "../CSSComponents/BackgroundThemes";
import { InputDiv, LoginForm } from "../CSSComponents/FrontPageCSS/FormCSS";
import { FrontHeader } from "../Outlets/FrontHeader";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Register } from "../Auth/AuthSlice";
import { AppDispatch } from "../AppStore/store";


export function RegisterPage(){
    const [ime,setIme] =useState("");
    const [prezime,setPrezime] =useState("");
    const [brojTelefona,setBrojTelefona] =useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [dostavljacBool,setDostavljac] =useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    async function RegisterForm(ev : React.FormEvent){
        ev.preventDefault();
        dispatch(Register({id:"",ime:ime,prezime:prezime,brojTelefona:brojTelefona,username:username,password:password,dostavljacBool:dostavljacBool})).unwrap().then(()=>{
            navigate("/korisnik");
        });

    }
    return (
    <BlackLightTheme>
        <div>
            <FrontHeader/>
            <LoginForm onSubmit={RegisterForm}>
                <h1 style={{display:"flex",alignSelf:"center"}}>Register</h1>
                    <div style={{marginBottom:"100px"}}>
                        <InputDiv>
                            <label style={{fontSize:"20px"}}>Ime:</label>
                            <input type="text" placeholder="Ime" onChange={(ev)=>setIme(ev.target.value)}></input>
                        </InputDiv>
                        <InputDiv>
                            <label style={{fontSize:"20px"}}>Prezime:</label>
                            <input type="text" placeholder="Prezime" onChange={(ev)=>setPrezime(ev.target.value)}></input>
                        </InputDiv>
                        <InputDiv>
                            <label style={{fontSize:"20px"}}>Broj Telefona:</label>
                            <input type="phone" placeholder="Broj Telefona" onChange={(ev)=>setBrojTelefona(ev.target.value)}></input>
                        </InputDiv>
                        <InputDiv>
                            <label style={{fontSize:"20px"}}>Username:</label>
                            <input type="text" placeholder="Username" onChange={(ev)=>setUsername(ev.target.value)}></input>
                        </InputDiv>
                        <InputDiv>
                            <label style={{fontSize:"20px"}}>Password:</label>
                            <input type="password" placeholder="Password" onChange={(ev)=>setPassword(ev.target.value)}></input>
                        </InputDiv>
                        <InputDiv>
                            <label style={{fontSize:"20px"}}>Kliknuti ako želite da se prijavite kao dostavljač:</label>
                            <input type="checkbox" onChange={(ev)=>setDostavljac(ev.target.checked)}></input>
                        </InputDiv>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <Link to="" style={{font:"20px solid",color:"white",marginBottom:"5px",marginLeft:"5px"}}>Već imate nalog, prijavite se!</Link>
                        <button style={{marginRight:"5px",marginBottom:"5px",border:"2px solid white", borderRadius:"5px",paddingLeft: "10px",paddingRight: "10px"}}>Register</button>
                    </div>
            </LoginForm>
        </div>
    </BlackLightTheme>
    );
}