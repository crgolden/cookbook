import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { RecipesService } from "../recipes.service"
import { RecipeVersion } from "../models/recipeVersion"

@Component({
    selector: "recipes-delete",
    templateUrl: "./delete.component.html"
})
export class DeleteComponent implements OnInit {

    errors: string = "";
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

    delete() {
        this.recipesService
            .delete(this.recipeVersion.recipeId)
            .subscribe(
                () => this.router.navigate(["/Recipes"]),
                (error: string) => this.errors = error);
    }
}
