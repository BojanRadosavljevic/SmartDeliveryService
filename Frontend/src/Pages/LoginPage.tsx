import { Link, useNavigate } from "react-router-dom";
import { BlackLightTheme } from "../CSSComponents/BackgroundThemes";
import { InputDiv, LoginForm } from "../CSSComponents/FrontPageCSS/FormCSS";
import { FrontHeader } from "../Outlets/FrontHeader";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../AppStore/store";
import { Login } from "../Auth/AuthSlice";
import { parseJwt } from "../Auth/AuthUtils";
import Cookies from "js-cookie";

export function LoginPage(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

   const LoginForma = (ev : React.FormEvent)=>{
        ev.preventDefault();
        dispatch(Login({username:username,password:password})).unwrap().then(()=>{
                    if(parseJwt(Cookies.get("Token")??"")?.role=="korisnik"){
                        navigate("/korisnik");
                    }else{
                        console.log(parseJwt(Cookies.get("Token")??"").role);
                    }

                });
    }
    return(
        <BlackLightTheme>
           <div>
                <FrontHeader/>
                <LoginForm onSubmit={LoginForma}>
                    <h1 style={{display:"flex",alignSelf:"center"}}>Login</h1>
                    <div style={{marginBottom:"100px"}}>
                        <InputDiv>
                            <label style={{fontSize:"20px"}}>Username:</label>
                            <input type="text" placeholder="Username" onChange={(ev)=>setUsername(ev.target.value)}></input>
                        </InputDiv>
                        <InputDiv>
                            <label style={{fontSize:"20px"}}>Password:</label>
                            <input type="password" placeholder="Password" onChange={(ev)=>setPassword(ev.target.value)}></input>
                        </InputDiv>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <Link to="" style={{font:"20px solid",color:"white",marginBottom:"5px",marginLeft:"5px"}}>Nemate nalog, napravite novi</Link>
                        <button style={{marginRight:"5px",marginBottom:"5px",border:"2px solid white", borderRadius:"5px",paddingLeft: "10px",paddingRight: "10px"}}>Login</button>
                    </div>
                </LoginForm>
           </div>
        </BlackLightTheme>
    );
}