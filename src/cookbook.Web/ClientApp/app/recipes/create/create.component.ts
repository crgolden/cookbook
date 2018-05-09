import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { Recipe } from "../models/recipe"
import { RecipeVersion } from "../models/recipeVersion"
import { RecipesService } from "../recipes.service"

@Component({
    selector: "recipes-create",
    templateUrl: "./create.component.html"
})
export class CreateComponent {

    errors: string = "";
    recipeVersion = new RecipeVersion();

    constructor(
        private readonly recipesService: RecipesService,
        private readonly router: Router) {
    }

    create(valid: boolean) {
        if (valid) {
            this.recipeVersion.dateCreated = new Date();
            const recipe = new Recipe();
            recipe.recipeVersions = new Array<RecipeVersion>();
            recipe.recipeVersions.push(this.recipeVersion);
            this.recipesService
                .create(recipe)
                .subscribe(
                    (res: Recipe | string) => {
                        if (typeof res !== "string") {
                            this.router.navigate([`/Recipes/Details/${res.id}`]);
                        }
                    },
                    (error: string) => this.errors = error);
        }
    }
}
