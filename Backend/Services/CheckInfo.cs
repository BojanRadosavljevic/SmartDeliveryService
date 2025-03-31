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
                if(!string.IsNullOrEmpty(value)&& Regex.IsMatch(value,@"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z")){
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
    }
}