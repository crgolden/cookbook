using cookbook.Models;
using Microsoft.EntityFrameworkCore;

namespace cookbook.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<RecipeVersion> RecipeVersions { get; set; }
    }
}