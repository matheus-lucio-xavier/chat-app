using Microsoft.EntityFrameworkCore;
using Projeto.Domain.Entities;

namespace Projeto.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
           : base(options){}
        
           
        
        public DbSet<UserModel> Usuarios { get; set; }
    }
}