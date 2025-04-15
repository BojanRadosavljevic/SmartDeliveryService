import { useSelector } from "react-redux";
import { FullFooter, KorpaFooter, LinkFooter } from "../CSSComponents/KorisnikPageCSS/FooterCSS";
import { RootState } from "../AppStore/store";
import { useCart } from "../Providers/CartProvider";
import { useNavigate } from "react-router-dom";
import { FaBasketShopping } from "react-icons/fa6";

export function KorisnikFooter(){
    const user = useSelector((state: RootState) => state.auth.user);
    const cart = useCart();
    const navigate = useNavigate();
    return(
    <FullFooter>
        <LinkFooter>{user?.ime+" "+user?.prezime}</LinkFooter>
        <KorpaFooter onClick={()=>navigate("/korpa")}>
            <FaBasketShopping style={{marginRight:"10px"}}/>
            KORPA {+"   "+cart.numberOfProducts+"   "+cart.price+".00"}
        </KorpaFooter>
    </FullFooter>);
}