using Microsoft.EntityFrameworkCore;
using WebApplication1.Model;

namespace WebApplication1.DataAccess{
    public class ContactDbContext : DbContext{
        public DbSet<Contact> Contacts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder){
            optionsBuilder.UseSqlite(
                "Data Source = C:\\Users\\arasi\\RiderProjects\\ContactList\\WebApplication1\\Contacts.db");
        }
    }
}