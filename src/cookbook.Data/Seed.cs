using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using cookbook.Models;

namespace cookbook.Data
{
    public class Seed
    {
        private readonly ApplicationDbContext _context;

        private static IEnumerable<Recipe> Recipes =>
            new List<Recipe>
            {
                new Recipe
                {
                    RecipeVersions = new List<RecipeVersion>
                    {
                        new RecipeVersion
                        {
                            Title = "Soup (Minestrone)",
                            Description = "How to make minestrone soup.",
                            DateCreated = DateTime.Now
                        },
                        new RecipeVersion
                        {
                            Title = "Soup (Tomato Bisque)",
                            Description = "How to make tomato bisque soup.",
                            DateCreated = DateTime.Now
                        },
                        new RecipeVersion
                        {
                            Title = "Soup (Clam Chowder)",
                            Description = "How to make clam chowder soup.",
                            DateCreated = DateTime.Now
                        },
                        new RecipeVersion
                        {
                            Title = "Soup (Chicken Noodle)",
                            Description = "How to make chicken noodle soup.",
                            DateCreated = DateTime.Now
                        }
                    }
                },
                new Recipe
                {
                    RecipeVersions = new List<RecipeVersion>
                    {
                        new RecipeVersion
                        {
                            Title = "Pasta (Lasagna)",
                            Description = "How to make lasagna pasta.",
                            DateCreated = DateTime.Now
                        },
                        new RecipeVersion
                        {
                            Title = "Pasta (Spaghetti)",
                            Description = "How to make spaghetti pasta.",
                            DateCreated = DateTime.Now
                        },
                        new RecipeVersion
                        {
                            Title = "Pasta (Macaroni)",
                            Description = "How to make macaroni pasta.",
                            DateCreated = DateTime.Now
                        },
                        new RecipeVersion
                        {
                            Title = "Pasta (Ravioli)",
                            Description = "How to make ravioli pasta.",
                            DateCreated = DateTime.Now
                        }
                    }
                },
                new Recipe
                {
                    RecipeVersions = new List<RecipeVersion>
                    {
                        new RecipeVersion
                        {
                            Title = "Sandwiches (Ham)",
                            Description = "How to make ham sandwiches.",
                            DateCreated = DateTime.Now
                        },
                        new RecipeVersion
                        {
                            Title = "Sandwiches (Peanut Butter and Jelly)",
                            Description = "How to make peanut butter and jelly sandwiches.",
                            DateCreated = DateTime.Now
                        },
                        new RecipeVersion
                        {
                            Title = "Sandwiches (Turkey)",
                            Description = "How to make turkey sandwiches.",
                            DateCreated = DateTime.Now
                        },
                        new RecipeVersion
                        {
                            Title = "Sandwiches (Grilled Cheese)",
                            Description = "How to make grilled cheese sandwiches.",
                            DateCreated = DateTime.Now
                        }
                    }
                },
                new Recipe
                {
                    RecipeVersions = new List<RecipeVersion>
                    {
                        new RecipeVersion
                        {
                            Title = "Cookies (Chocolate Chip)",
                            Description = "How to make chocolate chip cookies.",
                            DateCreated = DateTime.Now
                        },
                        new RecipeVersion
                        {
                            Title = "Cookies (Peanut Butter)",
                            Description = "How to make peanut butter cookies.",
                            DateCreated = DateTime.Now
                        },
                        new RecipeVersion
                        {
                            Title = "Cookies (Snickerdoodle)",
                            Description = "How to make snickerdoodle cookies.",
                            DateCreated = DateTime.Now
                        },
                        new RecipeVersion
                        {
                            Title = "Cookies (Oatmeal Raisin)",
                            Description = "How to make oatmeal raisin cookies.",
                            DateCreated = DateTime.Now
                        }
                    }
                },
                new Recipe
                {
                    RecipeVersions = new List<RecipeVersion>
                    {
                        new RecipeVersion
                        {
                            Title = "Ice Cream (Chocolate)",
                            Description = "How to make chocolate ice cream.",
                            DateCreated = DateTime.Now
                        },
                        new RecipeVersion
                        {
                            Title = "Ice Cream (Strawberry)",
                            Description = "How to make strawberry ice cream.",
                            DateCreated = DateTime.Now
                        },
                        new RecipeVersion
                        {
                            Title = "Ice Cream (Vanilla)",
                            Description = "How to make vanilla ice cream.",
                            DateCreated = DateTime.Now
                        },
                        new RecipeVersion
                        {
                            Title = "Ice Cream (Neapolitan)",
                            Description = "How to make neapolitan ice cream.",
                            DateCreated = DateTime.Now
                        }
                    }
                },
                new Recipe
                {
                    RecipeVersions = new List<RecipeVersion>
                    {
                        new RecipeVersion
                        {
                            Title = "Muffins (Banana Nut)",
                            Description = "How to make banana nut muffins.",
                            DateCreated = DateTime.Now
                        },
                        new RecipeVersion
                        {
                            Title = "Muffins (Chocolate)",
                            Description = "How to make chocolate muffins.",
                            DateCreated = DateTime.Now
                        },
                        new RecipeVersion
                        {
                            Title = "Muffins (Bran)",
                            Description = "How to make bran muffins.",
                            DateCreated = DateTime.Now
                        },
                        new RecipeVersion
                        {
                            Title = "Muffins (Blueberry)",
                            Description = "How to make blueberry muffins.",
                            DateCreated = DateTime.Now
                        }
                    }
                }
            };

        public Seed(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task SeedData()
        {
            if (!await _context.Recipes.AnyAsync())
            {
                await _context.AddRangeAsync(Recipes);
                await _context.SaveChangesAsync();
            }
        }
    }
}