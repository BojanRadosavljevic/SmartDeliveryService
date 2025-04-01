import { useSelector } from "react-redux";
import { RootState } from "../AppStore/store";

export function KorisnikMainPage(){
    const user = useSelector((state: RootState) => state.auth.user);

    // Prikazivanje podataka, koristeći opcioni lanac za sigurno pristupanje
    function aaa(){
      console.log(useSelector((state: RootState) => state.auth.role));
    }
    aaa();
    return (
      <div>
        <h1>User Profile</h1>
        <p>Ime: {user?.ime}</p>
        <p>Prezime: {user?.prezime}</p>
      </div>
    );
};