using System;

namespace cookbook.Models
{
    public class RecipeVersion
    {
        public Guid Id { get; set; }
        public Guid RecipeId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
    }
}