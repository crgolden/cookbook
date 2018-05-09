using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using cookbook.Models;

namespace cookbook.Services
{
    public class RecipeService : Service<Recipe>
    {
        public RecipeService(DbContext context) : base(context)
        {
        }

        public override async Task<List<Recipe>> Index()
        {
            return await Context.Set<Recipe>().AsNoTracking()
                .Include(x => x.RecipeVersions).ToListAsync();
        }

        public override async Task<Recipe> Details(Guid? id)
        {
            if (!id.HasValue) throw new ArgumentNullException();
            return await Context.Set<Recipe>().AsNoTracking()
                .Include(x => x.RecipeVersions).SingleOrDefaultAsync(x => x.Id == id.Value);
        }

        public override async Task Edit(Recipe recipe)
        {
            if (recipe == null) throw new ArgumentNullException();
            if (recipe.RecipeVersions.Count < 2)
                throw new ArgumentException("Edited Recipe must have at least 2 RecipeVersions");
            var recipeVersion = recipe.RecipeVersions.Last();
            if (recipeVersion.RecipeId != recipe.Id)
                throw new ArgumentException("New RecipeVersion.RecipeId must match Recipe.Id");
            Context.Set<RecipeVersion>().Add(recipeVersion);
            await Context.SaveChangesAsync();
        }
    }
}
