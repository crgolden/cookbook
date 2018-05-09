import { } from "jasmine";
import { defer } from "rxjs/observable/defer";

import { RecipesService } from "./recipes.service";
import { Recipe } from "./models/recipe"
import { RecipeVersion } from "./models/recipeVersion"

let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy, delete: jasmine.Spy };
let recipesService: RecipesService;
let recipe: Recipe;

describe("RecipesService", () => {

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj("HttpClient", ["get", "post", "put", "delete"]);
        recipesService = new RecipesService(httpClientSpy as any);
        recipe = { id: "1", recipeVersions: new Array<RecipeVersion>() };
    });

    it("index should return a list of recipes", () => {
        const recipes: Array<Recipe> = [recipe];

        httpClientSpy.get.and.returnValue(defer(() => Promise.resolve(recipes)));

        recipesService
            .index()
            .subscribe(
                res => expect(res).toEqual(recipes, "expected recipes"),
                fail);

        expect(httpClientSpy.get.calls.count()).toBe(1, "one call");
    });

    it("details should return a recipe", () => {
        httpClientSpy.get.and.returnValue(defer(() => Promise.resolve(recipe)));

        recipesService
            .details("1")
            .subscribe(
                res => expect(res).toEqual(recipe, "expected recipe"),
                fail);

        expect(httpClientSpy.get.calls.count()).toBe(1, "one call");
    });

    it("create should return an id", () => {
        httpClientSpy.post.and.returnValue(defer(() => Promise.resolve("1")));

        recipesService
            .create(recipe)
            .subscribe(
                res => expect(res).toEqual("1", "expected id"),
                fail);

        expect(httpClientSpy.post.calls.count()).toBe(1, "one call");
    });

    it("edit should not return anything", () => {
        httpClientSpy.put.and.returnValue(defer(() => Promise.resolve()));

        recipesService
            .edit(recipe)
            .subscribe(
                res => expect(res).toBeUndefined("expected undefined"),
                fail);

        expect(httpClientSpy.put.calls.count()).toBe(1, "one call");
    });

    it("delete should not return anything", () => {
        httpClientSpy.delete.and.returnValue(defer(() => Promise.resolve()));

        recipesService
            .delete(recipe.id)
            .subscribe(
                res => expect(res).toBeUndefined("expected undefined"),
                fail);

        expect(httpClientSpy.delete.calls.count()).toBe(1, "one call");
    });

});
