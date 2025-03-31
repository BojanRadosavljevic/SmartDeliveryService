import { Link, useLocation } from "react-router-dom";
import { HeaderDiv,headerLink } from "../CSSComponents/FrontPageCSS/HeaderCSS";

export function FrontHeader(){
    const location = useLocation();
    const stilIzabran = {...headerLink, backgroundColor:"white",color:"rgb(117, 117, 111)"}
    
    return(
        <HeaderDiv>
            <Link to={'/login'} style={location.pathname=="/login"?stilIzabran:headerLink}>Login</Link>
            <Link to={'/register'} style={location.pathname=="/register"?stilIzabran:headerLink}>Register</Link>
            <Link to={'/'} style={location.pathname=="/"?stilIzabran:headerLink}>Home</Link>
        </HeaderDiv>
    );
}