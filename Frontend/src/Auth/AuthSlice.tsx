import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { register,login } from "./AuthAPI";
import { parseJwt } from "./AuthUtils";

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

interface AuthStateKorisnik {
    korisnik : Korisnik | null;
    loading: boolean;
    error: string | null;
  }
  interface AuthStateDostavljac {
    dostavljac : Dostavljac | null;
    loading: boolean;
    error: string | null;
  }

const initialStateKorinsik: AuthStateKorisnik = {
    korisnik: JSON.parse(localStorage.getItem('korisnik') || 'null'),
    loading: false,
    error: null,
};

const initialStateDostavljac: AuthStateDostavljac = {
    dostavljac: JSON.parse(localStorage.getItem('dostavljac') || 'null'),
    loading: false,
    error: null,
};

export const Register = createAsyncThunk(
    'auth/register',
    async(userData:{id: string, ime: string, prezime: string, brojTelefona: string, username: string, password: string, dostavljac: boolean},{rejectWithValue})=>{
        try{
            const data = await register(userData);
            if(userData.dostavljac==true){
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
            const token = data.token;
            localStorage.setItem("token", token);
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
    initialState:{
        token: localStorage.getItem("token")||null,
        loading : false,
        error: null as string | null,
    },reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.loading = false;
      state.error = null;
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
            state.token = action.payload;
          })
          .addCase(Login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
          });
      }
});

export default authSlice.reducer;