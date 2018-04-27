using System;
using System.Collections.Generic;

namespace cookbook.Models
{
    public class Recipe
    {
        public Guid Id { get; set; }
        public List<RecipeVersion> RecipeVersions { get; set; }
    }
}