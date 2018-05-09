using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using cookbook.API;
using cookbook.Interfaces;
using cookbook.Models;

namespace cookbook.Tests.API
{
    public class RecipesControllerFacts
    {
        private readonly Recipe _recipe;
        private readonly Mock<IService<Recipe>> _service;

        public RecipesControllerFacts()
        {
            _recipe = new Recipe();
            _service = new Mock<IService<Recipe>>();
            SetupService();
        }

        [Fact]
        public async Task Index()
        {
            var controller = new RecipesController(_service.Object);

            var result = await controller.Index();

            var okObjectResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<IEnumerable<Recipe>>(okObjectResult.Value);
            Assert.Single(model);
        }

        [Fact]
        public async Task Details()
        {
            var controller = new RecipesController(_service.Object);

            var result = await controller.Details(_recipe.Id);

            var okObjectResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<Recipe>(okObjectResult.Value);
            Assert.Equal(_recipe.Id, model.Id);
        }

        [Fact]
        public async Task Details_Bad_Id()
        {
            var controller = new RecipesController(_service.Object);

            var result = await controller.Details(Guid.NewGuid());

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task Create()
        {
            var controller = new RecipesController(_service.Object);

            var result = await controller.Create(_recipe);

            var okObjectResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<Recipe>(okObjectResult.Value);
            Assert.Equal(_recipe.Id, model.Id);
        }

        [Fact]
        public async Task Create_Bad_Recipe()
        {
            var controller = new RecipesController(_service.Object);
            controller.ModelState.AddModelError(string.Empty, string.Empty);

            var result = await controller.Create(_recipe);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async Task Edit()
        {
            var controller = new RecipesController(_service.Object);

            var result = await controller.Edit(_recipe.Id, _recipe);

            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async Task Edit_Null_Id()
        {
            var controller = new RecipesController(_service.Object);

            var result = await controller.Edit(null, _recipe);

            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public async Task Delete()
        {
            var controller = new RecipesController(_service.Object);

            var result = await controller.Delete(_recipe.Id);

            Assert.IsType<OkResult>(result);
        }

        private void SetupService()
        {
            _service.Setup(x => x.Index()).Returns(Task.FromResult(new List<Recipe> { _recipe }));
            _service.Setup(x => x.Details(_recipe.Id)).Returns(Task.FromResult(_recipe));
            _service.Setup(x => x.Create(_recipe)).Returns(Task.FromResult(_recipe));
            _service.Setup(x => x.Edit(_recipe)).Returns(Task.CompletedTask);
            _service.Setup(x => x.Delete(_recipe.Id)).Returns(Task.CompletedTask);
        }
    }
}
