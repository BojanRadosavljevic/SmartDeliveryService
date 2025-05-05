import axios from "axios";

const API_URL = `http://${window.location.hostname}:5233/Auth`;

export const register = async (userData:{id: string, ime: string, prezime: string, brojTelefona: string, username: string, password: string, dostavljacBool: boolean})=>{
    const response = await axios.post(`http://${window.location.hostname}:5233/Auth/Register`, userData
,  { withCredentials: true  ,headers: { "Content-Type": "application/json" }});
    return response.data;
};

export const login = async ( username: string, password: string)=>{
    const response = await axios.get(`${API_URL}/Login`,{
        params:{
            username: username,
            password: password
        }, withCredentials:true
    });
    return response.data;
};