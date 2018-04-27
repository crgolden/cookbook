import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { RecipeVersion } from "../models/recipeVersion"
import { RecipesService } from "../recipes.service"

@Component({
    selector: "recipes-create",
    templateUrl: "./create.component.html"
})
export class CreateComponent {

    errors: string = "";
    isRequesting: boolean = false;
    submitted: boolean = false;
    recipeVersion = new RecipeVersion();

    constructor(
        private readonly recipesService: RecipesService,
        private readonly router: Router) {
    }

    create({ recipeVersion, valid }: { recipeVersion: RecipeVersion, valid: boolean }) {
        this.submitted = true;

        if (valid) {
            this.isRequesting = true;
            this.recipeVersion.dateCreated = new Date();
            this.recipesService
                .create(this.recipeVersion)
                .finally(() => this.isRequesting = false)
                .subscribe(
                (id: string) => this.router.navigate([`/Recipes/Details/${id}`]),
                (error: string) => this.errors = error);
        }
    }
}
