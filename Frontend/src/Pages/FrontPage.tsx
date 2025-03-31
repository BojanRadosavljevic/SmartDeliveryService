import { BlackLightTheme} from "../CSSComponents/BackgroundThemes.tsx"
import { FrontHeader } from "../Outlets/FrontHeader.tsx";
export function FrontPage(){
    return(
        <BlackLightTheme>
                <FrontHeader/>
                <div>
                    <h1>Welcome!!!</h1>
                </div>
                <div>Smart DeliveryService</div>
        </BlackLightTheme>
    );
}