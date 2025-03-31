
namespace DTOs{
    public class RegisterDTO{
        public string id { get; set; }
        public required string ime { get; set; }
        public required string prezime { get; set; }
        public required string brojTelefona { get; set; }
        public required string username { get; set; }
        public required string password { get; set; }
        public required Boolean Dostavljac { get; set; }

    }
}