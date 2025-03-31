using System.Text;

namespace Services{
    public class PasswordCrypting{
        private static string  key = "aabdjshd35d6s7@daad";

        public static string EncryptPassword(string Pass, string korIme)
        {
            if (string.IsNullOrWhiteSpace(Pass) == true)
                return "Los password za enkripciju";

            if (string.IsNullOrWhiteSpace(korIme) == true)
                return "Lose korisnicko ime za enkripciju";

            Pass = Pass + korIme + key;
            byte[] newPas = Encoding.UTF8.GetBytes(Pass);
            return Convert.ToBase64String(newPas);
        }

        public static string DecryptPassword(string Passa,string korIme)
        {
            if (string.IsNullOrWhiteSpace(Passa) == true)
                return "Losa deskripcija passworda";

            byte[] Pass = Convert.FromBase64String(Passa);
            string result = Encoding.UTF8.GetString(Pass);
            result = result.Substring(0,result.Length-(korIme.Length+key.Length));
            return result;
        }
    }
}