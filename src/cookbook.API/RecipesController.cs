using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using cookbook.Interfaces;
using cookbook.Models;

namespace cookbook.API
{
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    public class RecipesController : Controller
    {
        private readonly IService<Recipe> _recipeService;

        public RecipesController(IService<Recipe> recipeService)
        {
            _recipeService = recipeService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            return Ok(await _recipeService.Index());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Details([FromRoute] Guid? id)
        {
            try
            {
                var recipe = await _recipeService.Details(id);
                if (recipe == null)
                {
                    return NotFound();
                }
                return Ok(recipe);
            }
            catch (ArgumentNullException)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody, Bind("Id,RecipeVersions")] Recipe recipe)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                return Ok(await _recipeService.Create(recipe));
            }
            catch (ArgumentNullException)
            {
                return BadRequest();
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit([FromRoute] Guid? id, [FromBody, Bind("Id,RecipeVersions")] Recipe recipe)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (!id.HasValue || id.Value != recipe?.Id)
            {
                return BadRequest();
            }
            try
            {
                await _recipeService.Edit(recipe);
                return Ok();
            }
            catch (ArgumentNullException)
            {
                return BadRequest();
            }
            catch (ArgumentException exception)
            {
                Console.WriteLine(exception.Message);
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid? id)
        {
            try
            {
                await _recipeService.Delete(id);
                return Ok();
            }
            catch (ArgumentNullException)
            {
                return BadRequest();
            }
        }
    }
}
