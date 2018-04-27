import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { RecipesService } from "../recipes.service"
import { RecipeVersion } from "../models/recipeVersion"

@Component({
    selector: "recipes-edit",
    templateUrl: "./edit.component.html"
})
export class EditComponent implements OnInit {

    errors: string = "";
    isRequesting: boolean = false;
    submitted: boolean = false;
    recipeVersion = new RecipeVersion();

    constructor(
        private readonly recipesService: RecipesService,
        private readonly router: Router,
        private readonly route: ActivatedRoute) {
    }

    ngOnInit(): void {
        const recipe = this.route.snapshot.data["recipe"],
            lastVersionIndex = recipe.recipeVersions.length - 1;
        this.recipeVersion = recipe.recipeVersions[lastVersionIndex];
    }

    edit({ recipeVersion, valid }: { recipeVersion: RecipeVersion, valid: boolean }) {
        this.submitted = true;
        this.recipeVersion.dateCreated = new Date();
        this.recipeVersion.id = undefined;

        if (valid) {
            this.isRequesting = true;
            this.recipesService
                .edit(this.recipeVersion)
                .finally(() => this.isRequesting = false)
                .subscribe(
                () => this.router.navigate([`/Recipes/Details/${this.recipeVersion.recipeId}`]),
                (error: string) => this.errors = error);
        }
    }
}
