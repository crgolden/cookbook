using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using cookbook.Data;
using cookbook.Models;

namespace cookbook.Controllers
{
    [Route("[controller]/[action]")]
    public class RecipesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public RecipesController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            return Json(await _context.Recipes.Include(x => x.RecipeVersions).ToArrayAsync());
        }

        public async Task<IActionResult> Details(Guid? id)
        {
            if (id == null)
            {
                return BadRequest();
            }
            var recipe = await _context.Recipes
                .Include(x => x.RecipeVersions)
                .SingleOrDefaultAsync(x => x.Id == id.Value);
            if (recipe == null)
            {
                return NotFound();
            }
            return Json(recipe);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody, Bind("Title,Description,DateCreated")] RecipeVersion recipeVersion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var recipeVersions = new List<RecipeVersion> { recipeVersion };
            var recipe = new Recipe { RecipeVersions = recipeVersions };
            _context.Recipes.Add(recipe);
            await _context.SaveChangesAsync();
            return Json(recipe.Id);
        }

        public async Task<IActionResult> Edit(Guid? id, [FromBody, Bind("RecipeId,Title,Description,DateCreated")] RecipeVersion recipeVersion)
        {
            if (id == null || id.Value != recipeVersion.RecipeId || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _context.RecipeVersions.Add(recipeVersion);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.Recipes.AnyAsync(x => x.Id == id.Value))
                {
                    return NotFound();
                }
                throw;
            }
            return Ok();
        }

        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null)
            {
                return BadRequest();
            }
            var recipe = await _context.Recipes.SingleOrDefaultAsync(x => x.Id == id.Value);
            if (recipe == null)
            {
                return NotFound();
            }
            _context.Recipes.Remove(recipe);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
