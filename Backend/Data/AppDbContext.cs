using Microsoft.EntityFrameworkCore;
using Models;

namespace Data{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options):base(options){
        }
        public DbSet<Artikal> artikli { get; set; }
        public DbSet<Paket> paketi { get; set; }
        public DbSet<Korisnik> korisnici { get; set; }
        public DbSet<Dostava> dostave { get; set; }
        public DbSet<Dostavljac> dostavljaci { get; set; }
        
    }
}