import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { register,login } from "./AuthAPI";
import { parseJwt } from "./AuthUtils";
import Cookies from "js-cookie";


interface Korisnik{
    id : string;
    ime : string;
    prezime : string;
    brojTelefona : string;
    adresaZaDostavu : string;
    username : string;
    password : string;
}
interface Dostavljac{
    id : string;
    ime : string;
    prezime : string;
    brojTelefona : string;
    username : string;
    password : string;
}

interface AuthState {
    user: Korisnik | Dostavljac | null;
    token: string | null;
    role: string | null;
    loading: boolean;
    error: string | null;
  }
  const loadUserFromStorage = (): Korisnik | Dostavljac | null => {
    try {
       
        const storedDostavljac = localStorage.getItem("dostavljac");
        const storedKorisnik = localStorage.getItem("korisnik");

        if (storedDostavljac) return JSON.parse(storedDostavljac);
        if (storedKorisnik) return JSON.parse(storedKorisnik);

        return null;
    } catch (error) {
        console.error("Greška pri parsiranju korisnika iz localStorage:", error);
        return null;
    }
};
  const token = Cookies.get("Token");
  const role = token ? parseJwt(token)?.role || null : null;

  const initialState: AuthState = {
    user: loadUserFromStorage(),
    token: Cookies.get("Token") || null,
    loading : false,
    role: role,
    error: null,
  };

export const Register = createAsyncThunk(
    'auth/register',
    async(userData:{id: string, ime: string, prezime: string, brojTelefona: string, username: string, password: string, dostavljacBool: boolean},{rejectWithValue})=>{
        try{
            const data = await register(userData);
            if(userData.dostavljacBool==true){
                localStorage.setItem('dostavljac',JSON.stringify(data));
            }else{
                localStorage.setItem('korisnik',JSON.stringify(data));
            }

            return data;
        }catch(error: any){
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const Login = createAsyncThunk(
    'auth/login',
    async(userData: { username: string, password: string},{rejectWithValue})=>{
        try{
            const data = await login(userData.username,userData.password); 
            
            const token = Cookies.get("Token") ?? "";
            const decoded = parseJwt(token);
            const role = decoded?.role || "korisnik";
            if(role=="dostavljac"){
                localStorage.setItem('dostavljac',JSON.stringify(data));
            }else{
                localStorage.setItem('korisnik',JSON.stringify(data));
            }
            return data;
        }catch(error: any){
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const authSlice = createSlice({
    name:"auth",
    initialState: initialState
    ,reducers: {
    logout: (state) => {
        Cookies.remove("Token");
        localStorage.removeItem("korisnik");
        localStorage.removeItem("dostavljac");
        state.loading = false;
        state.error = null;
        state.user = null;
        state.token = null;
        state.role = null;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(Login.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(Login.fulfilled, (state, action) => {
            state.loading = false;
            state.token = Cookies.get("Token")??"";
            state.user = action.payload;
            const decoded = parseJwt(Cookies.get("Token")??"");
            state.role = decoded?.role || "korisnik";
          })
          .addCase(Login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            
          })
          .addCase(Register.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(Register.fulfilled, (state, action) => {
            state.loading = false;
            state.token = Cookies.get("Token")??"";
            state.user = action.payload;
            const decoded = parseJwt(Cookies.get("Token")??"");
            state.role = decoded?.role || "korisnik";
          })
          .addCase(Register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
          });
      },
    });

export default authSlice.reducer;