using Enums;

namespace DTOs{
    public class UserDTO{
        public required string id { get; set; }
        public required string ime { get; set; }
        public required string prezime { get; set; }
        public required string brojTelefona { get; set; }
        public string? adresaZaDostavu { get; set; }
        public required string username { get; set; }
        public required string password { get; set; }
        public required string role { get; set; }

    }
}