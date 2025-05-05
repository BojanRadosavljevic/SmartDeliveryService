import { Link, useNavigate } from "react-router-dom";
import { HeaderDiv, headerLink, HeaderPlus, StartDiv } from "../CSSComponents/KorisnikPageCSS/HeaderCSS";
import { HiOutlineFaceSmile } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../AppStore/store";
import { HiOutlineUser } from "react-icons/hi";
import { useState } from "react";
import { logout } from "../Auth/AuthSlice";


export function DostavljacHeader(){
    const user = useSelector((state: RootState) => state.auth.user);
    const [isOpen,setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function izlogujSe() {
        dispatch(logout());
        navigate('/login');
        return null;
    }
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
                <HeaderPlus onClick={()=>navigate('/dostave')}>
                    Moje dostave
                </HeaderPlus>
                <HeaderPlus onClick={()=>izlogujSe()}>
                    Izloguj se
                </HeaderPlus>
            </div>}
        </div>);
}