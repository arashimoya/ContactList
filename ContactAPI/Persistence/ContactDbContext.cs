using ContactAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace ContactAPI.Persistence{
    public class ContactDbContext : DbContext{
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder){
            optionsBuilder.UseSqlite(
                "Data Source = C:\\Users\\arasi\\RiderProjects\\ContactList\\ContactAPI\\Contacts.db");
        }
    }
}