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
        public DbSet<ArtikalKolicina> artikliKolicina { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ArtikalKolicina>()
                .HasOne<Artikal>()
                .WithMany()
                .HasForeignKey(ak=>ak.artikalId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Paket>()
                .HasMany(p=>p.listaArtikala)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);
            
            modelBuilder.Entity<Paket>()
                .HasOne(p=>p.korisnik)
                .WithMany()
                .HasForeignKey("korisnikid")
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Dostava>()
                .HasOne(d=>d.dostavljac)
                .WithMany()
                .HasForeignKey("dostavljacid")
                .OnDelete(DeleteBehavior.Restrict);
            
            modelBuilder.Entity<Dostava>()
                .HasOne(k=>k.paket)
                .WithMany()
                .HasForeignKey("paketid")
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Korisnik>()
                .HasIndex(k=>k.username)
                .IsUnique();

            modelBuilder.Entity<Dostavljac>()
                .HasIndex(d=>d.username)
                .IsUnique();

            base.OnModelCreating(modelBuilder);
        }
    }
}