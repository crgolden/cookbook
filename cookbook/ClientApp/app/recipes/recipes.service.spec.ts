import { } from "jasmine";
import { defer } from "rxjs/observable/defer";

import { RecipesService } from "./recipes.service";
import { Recipe } from "./models/recipe"

let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy, delete: jasmine.Spy };
let recipesService: RecipesService;

describe("RecipesService", () => {

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj("HttpClient", ["get", "post", "put", "delete"]);
        recipesService = new RecipesService(httpClientSpy as any);
    });

    it("index should return a list of recipes", () => {
        const expectedRecipes: Recipe[] = [
            { id: "1", recipeVersions: [] },
            { id: "2", recipeVersions: [] }
        ];

        httpClientSpy.get.and.returnValue(defer(() => Promise.resolve(expectedRecipes)));

        recipesService
            .index()
            .subscribe(recipes => expect(recipes).toEqual(expectedRecipes, "expected recipes"), fail);

        expect(httpClientSpy.get.calls.count()).toBe(1, "one call");
    });

    it("details should return a recipe", () => {
        const expectedRecipe: Recipe = { id: "1", recipeVersions: [] };

        httpClientSpy.get.and.returnValue(defer(() => Promise.resolve(expectedRecipe)));

        recipesService
            .details("1")
            .subscribe(recipe => expect(recipe).toEqual(expectedRecipe, "expected recipe"), fail);

        expect(httpClientSpy.get.calls.count()).toBe(1, "one call");
    });

    it("create should return a recipe", () => {
        httpClientSpy.post.and.returnValue(defer(() => Promise.resolve("1")));

        recipesService
            .create({ title: "Sushi", description: "Make sushi!" })
            .subscribe(recipe => expect(recipe).toEqual("1", "expected recipe"), fail);

        expect(httpClientSpy.post.calls.count()).toBe(1, "one call");
    });

    it("edit should not return anything", () => {
        httpClientSpy.put.and.returnValue(defer(() => Promise.resolve()));

        recipesService
            .edit({ title: "Sushi", description: "Make sushi!" })
            .subscribe((recipe) => expect(recipe).toBeUndefined(), fail);

        expect(httpClientSpy.put.calls.count()).toBe(1, "one call");
    });

    it("delete should not return anything", () => {
        httpClientSpy.delete.and.returnValue(defer(() => Promise.resolve()));

        recipesService
            .delete("1")
            .subscribe(recipe => expect(recipe).toBeUndefined(), fail);

        expect(httpClientSpy.delete.calls.count()).toBe(1, "one call");
    });


});
