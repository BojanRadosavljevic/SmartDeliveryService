import axios from "axios";

const API_URL = `http://localhost:5233/Auth`;

export const register = async (userData:{id: string, ime: string, prezime: string, brojTelefona: string, username: string, password: string, dostavljac: boolean})=>{
    const response = await axios.post(`${API_URL}/register`,{
        userData
    },{withCredentials:true});
    return response.data;
};

export const login = async ( username: string, password: string)=>{
    const response = await axios.get(`${API_URL}/register`,{
        params:{
            username: username,
            password: password
        }, withCredentials:true
    });
    return response.data;
};