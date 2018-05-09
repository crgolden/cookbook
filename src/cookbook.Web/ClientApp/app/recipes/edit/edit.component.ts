import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Recipe } from "../models/recipe"
import { RecipesService } from "../recipes.service"
import { RecipeVersion } from "../models/recipeVersion"

@Component({
    selector: "recipes-edit",
    templateUrl: "./edit.component.html"
})
export class EditComponent implements OnInit {

    errors: string = "";
    recipeVersion = new RecipeVersion();
    recipe = new Recipe();

    constructor(
        private readonly recipesService: RecipesService,
        private readonly router: Router,
        private readonly route: ActivatedRoute) {
    }

    ngOnInit(): void {
        const recipe = this.route.snapshot.data["recipe"],
            lastVersionIndex = recipe.recipeVersions.length - 1,
            recipeVersion = recipe.recipeVersions[lastVersionIndex];

        this.recipe = recipe;
        this.recipeVersion.recipeId = this.recipe.id;
        this.recipeVersion.title = recipeVersion.title;
        this.recipeVersion.description = recipeVersion.description;
        this.recipeVersion.dateCreated = new Date();
    }

    edit(valid: boolean) {
        if (valid && typeof this.recipe.recipeVersions !== "undefined") {
            this.recipe.recipeVersions.push(this.recipeVersion);
            this.recipesService
                .edit(this.recipe)
                .subscribe(
                    () => this.router.navigate([`/Recipes/Details/${this.recipe.id}`]),
                    (error: string) => this.errors = error);
        }
    }
}
