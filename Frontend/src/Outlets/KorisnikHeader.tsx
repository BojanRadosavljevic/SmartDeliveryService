import { Link, useNavigate } from "react-router-dom";
import { HeaderDiv, headerLink, HeaderPlus, StartDiv } from "../CSSComponents/KorisnikPageCSS/HeaderCSS";
import { HiOutlineFaceSmile } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../AppStore/store";
import { HiOutlineUser } from "react-icons/hi";
import { useEffect, useState } from "react";
import { logout } from "../Auth/AuthSlice";
import axios from "axios";


export function KorisnikHeader(){
    const {user,role} = useSelector((state: RootState) => state.auth);
    const [obavestenja,setObavestenja] = useState([]);
    const [isOpen,setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function vratiNeprocitanaObavestenja(){
        var response = await axios.get(`http://${window.location.hostname}:5233/Obavestenje/vratiNeprocitanaObavestenja`,{
            params:{
                userId:user?.id
            }
        });
        setObavestenja(response.data);
    }
    function izlogujSe() {
        dispatch(logout());
        navigate('/login');
        return null;
    }
    useEffect(()=>{
        vratiNeprocitanaObavestenja();
    },[]);
    return(
        <div style={{ position: "relative" }}>
            <HeaderDiv>
                <StartDiv>
                    <HiOutlineFaceSmile style={{fontSize:"20px",marginLeft:"10px"}}/>
                    <Link to="/korisnik" style={headerLink}>Smart Delivery Service</Link>
                </StartDiv>
                <StartDiv onClick={()=>{setIsOpen(!isOpen)}}>
                    <HiOutlineUser style={{fontSize:"20px",marginLeft:"10px"}}/>
                    <div style={headerLink}>{user?.username}</div>
                </StartDiv>      
            </HeaderDiv>
            {isOpen&&
           <div style={{
            position: "absolute",
            right: 0,
            top: "100%",
            display: "flex",
            alignItems: "flex-end",
            flexDirection: "column",
        }}>
                <HeaderPlus onClick={()=>{navigate('/podesavanja')}}>
                    Podesavanja
                </HeaderPlus>
                {role==="korisnik"?(<HeaderPlus onClick={()=>navigate('/obavestenja')}>
                    Obavestenja{" "+obavestenja.length}
                </HeaderPlus>):("")}
                <HeaderPlus onClick={()=>navigate('/paketi')}>
                    Dostave
                </HeaderPlus>
                <HeaderPlus onClick={()=>izlogujSe()}>
                    Izloguj se
                </HeaderPlus>
            </div>}
        </div>);
}