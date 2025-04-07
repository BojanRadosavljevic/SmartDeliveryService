using System.Text.RegularExpressions;

namespace Services{
    public class CheckInfo{

        public static bool RegisterCheck(string type,string value){
           switch(type){
            case "ime":{
                if(!string.IsNullOrEmpty(value)) return true;
                return false;
            }
            case "prezime":{
                if(!string.IsNullOrEmpty(value)) return true;
                return false;
            }
            case "brojTelefona":{
                if(!string.IsNullOrEmpty(value) && Regex.IsMatch(value,@"^\+?[0-9][0-9\s.-]{7,11}$")){
                    return true;
                }
                return false;
            }
            case "username":{
                if(!string.IsNullOrEmpty(value))return true;
                return false;
            }
            case "password":{
                if(!string.IsNullOrEmpty(value))return true;
                return false;
            }
           }
           return true;
        }   
        public static bool ArtikalCheck(string type, string value){
            if(type != "cena"){
                if(!string.IsNullOrEmpty(value)) return true;
                    return false;
            }else{
                if(Int32.Parse(value)>0) return true;
                    return false;
            }

        }
    }
}