using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Xunit;
using cookbook.Data;
using cookbook.Models;
using cookbook.Services;

namespace cookbook.Tests.Services
{
    public class RecipeServiceFacts
    {
        [Fact]
        public async Task Index()
        {
            Recipe recipe1 = new Recipe {Id = Guid.NewGuid()},
                recipe2 = new Recipe {Id = Guid.NewGuid()},
                recipe3 = new Recipe {Id = Guid.NewGuid()};
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("Index")
                .Options;

            using (var context = new ApplicationDbContext(options))
            {
                await context.Recipes.AddRangeAsync(new List<Recipe> {recipe1, recipe2, recipe3});
                await context.SaveChangesAsync();
            }

            using (var context = new ApplicationDbContext(options))
            {
                var recipeService = new RecipeService(context);
                var recipes = await recipeService.Index();

                Assert.NotNull(recipes);
                Assert.IsType<List<Recipe>>(recipes);
                Assert.Equal(3, recipes.Count);
                Assert.IsType<Recipe>(recipes.Find(x => x.Id == recipe1.Id));
                Assert.IsType<Recipe>(recipes.Find(x => x.Id == recipe2.Id));
                Assert.IsType<Recipe>(recipes.Find(x => x.Id == recipe3.Id));
            }
        }

        [Fact]
        public async Task Details()
        {
            var id = Guid.NewGuid();
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("Details")
                .Options;

            using (var context = new ApplicationDbContext(options))
            {
                context.Recipes.Add(new Recipe {Id = id});
                await context.SaveChangesAsync();
            }

            using (var context = new ApplicationDbContext(options))
            {
                var recipeService = new RecipeService(context);
                var recipe = await recipeService.Details(id);

                Assert.NotNull(recipe);
                Assert.IsType<Recipe>(recipe);
                Assert.Equal(id, recipe.Id);
            }
        }

        [Fact]
        public async Task Details_Null_Id()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("Details_Null_Id")
                .Options;

            using (var context = new ApplicationDbContext(options))
            {
                var recipeService = new RecipeService(context);

                await Assert.ThrowsAsync<ArgumentNullException>(() => recipeService.Details(null));
            }
        }

        [Fact]
        public async Task Create()
        {
            const string title = "Title", description = "Description";
            Guid id;
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("Create")
                .Options;

            using (var context = new ApplicationDbContext(options))
            {
                var recipeService = new RecipeService(context);
                var recipeVersion = new RecipeVersion
                {
                    Title = title,
                    Description = description
                };
                var recipe = await recipeService.Create(new Recipe
                {
                    RecipeVersions = new List<RecipeVersion> {recipeVersion}
                });
                id = recipe.Id;
            }

            using (var context = new ApplicationDbContext(options))
            {
                var recipe = await context.Recipes
                    .Include(x => x.RecipeVersions).SingleOrDefaultAsync(x => x.Id == id);

                Assert.NotNull(recipe);
                Assert.IsType<Recipe>(recipe);
                Assert.Single(recipe.RecipeVersions);

                var recipeVersion = recipe.RecipeVersions.First();

                Assert.IsType<RecipeVersion>(recipeVersion);
                Assert.Equal(title, recipeVersion.Title);
                Assert.Equal(description, recipeVersion.Description);
            }
        }

        [Fact]
        public async Task Create_Null_Recipe()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("Create_Null_Recipe")
                .Options;

            using (var context = new ApplicationDbContext(options))
            {
                var recipeService = new RecipeService(context);

                await Assert.ThrowsAsync<ArgumentNullException>(() => recipeService.Create(null));
            }
        }

        [Fact]
        public async Task Edit()
        {
            const string title = "Title", description = "Description";
            Guid id;
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("Edit")
                .Options;

            using (var context = new ApplicationDbContext(options))
            {
                var recipe = new Recipe
                {
                    RecipeVersions = new List<RecipeVersion>
                    {
                        new RecipeVersion {Title = title, Description = description}
                    }
                };
                context.Recipes.Add(recipe);
                await context.SaveChangesAsync();
                id = recipe.Id;
            }

            using (var context = new ApplicationDbContext(options))
            {
                var recipeService = new RecipeService(context);
                var recipeVersion = new RecipeVersion
                {
                    RecipeId = id,
                    Title = title,
                    Description = description
                };
                var recipe = await context.Recipes
                    .Include(x => x.RecipeVersions).SingleOrDefaultAsync(x => x.Id == id);
                recipe.RecipeVersions.Add(recipeVersion);
                await recipeService.Edit(recipe);
            }

            using (var context = new ApplicationDbContext(options))
            {
                var recipe = await context.Recipes.Include(x => x.RecipeVersions).SingleOrDefaultAsync(x => x.Id == id);

                Assert.NotNull(recipe);
                Assert.IsType<Recipe>(recipe);
                Assert.Equal(2, recipe.RecipeVersions.Count);

                var recipeVersion = recipe.RecipeVersions.First();

                Assert.IsType<RecipeVersion>(recipeVersion);
                Assert.Equal(title, recipeVersion.Title);
                Assert.Equal(description, recipeVersion.Description);
            }
        }

        [Fact]
        public async Task Edit_Null_Recipe()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("Edit_Null_Recipe")
                .Options;

            using (var context = new ApplicationDbContext(options))
            {
                var recipeService = new RecipeService(context);

                await Assert.ThrowsAsync<ArgumentNullException>(() => recipeService.Edit(null));
            }
        }

        [Fact]
        public async Task Edit_Only_One_RecipeVersion()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("Edit_Only_One_RecipeVersion")
                .Options;
            var recipe = new Recipe
            {
                RecipeVersions = new List<RecipeVersion>
                {
                    new RecipeVersion {Title = "Title", Description = "Description"}
                }
            };

            using (var context = new ApplicationDbContext(options))
            {
                var recipeService = new RecipeService(context);

                await Assert.ThrowsAsync<ArgumentException>(() => recipeService.Edit(recipe));
            }
        }

        [Fact]
        public async Task Edit_Bad_Id()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("Edit_Bad_Id")
                .Options;
            var recipe = new Recipe {Id = Guid.NewGuid(), RecipeVersions = new List<RecipeVersion>()};
            recipe.RecipeVersions.Add(new RecipeVersion());
            recipe.RecipeVersions.Add(new RecipeVersion());

            using (var context = new ApplicationDbContext(options))
            {
                var recipeService = new RecipeService(context);

                await Assert.ThrowsAsync<ArgumentException>(() => recipeService.Edit(recipe));
            }
        }

        [Fact]
        public async Task Delete()
        {
            Guid id;
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("Delete")
                .Options;

            using (var context = new ApplicationDbContext(options))
            {
                var recipe = new Recipe();

                context.Recipes.Add(recipe);
                await context.SaveChangesAsync();

                id = recipe.Id;
            }

            using (var context = new ApplicationDbContext(options))
            {
                Assert.Single(context.Recipes);

                var recipeService = new RecipeService(context);
                await recipeService.Delete(id);

                Assert.Empty(context.Recipes);
            }
        }

        [Fact]
        public async Task Delete_Null_Id()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("Delete_Null_Id")
                .Options;

            using (var context = new ApplicationDbContext(options))
            {
                var recipeService = new RecipeService(context);

                await Assert.ThrowsAsync<ArgumentNullException>(() => recipeService.Delete(null));
            }
        }
    }
}
