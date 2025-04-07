import { useSelector } from "react-redux";
import { FullFooter, KorpaFooter, LinkFooter } from "../CSSComponents/KorisnikPageCSS/FooterCSS";
import { RootState } from "../AppStore/store";
import { HiArchiveBox } from "react-icons/hi2";
import { useCart } from "../Providers/CartProvider";

export function KorisnikFooter(){
    const user = useSelector((state: RootState) => state.auth.user);
    const {cart} = useCart();
    return(
    <FullFooter>
        <LinkFooter>{user?.ime+" "+user?.prezime}</LinkFooter>
        <KorpaFooter>
            <HiArchiveBox style={{marginRight:"10px"}}/>
            KORPA {+"   "+cart.length}
        </KorpaFooter>
    </FullFooter>);
}