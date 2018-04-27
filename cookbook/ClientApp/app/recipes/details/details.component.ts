import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Recipe } from "../models/recipe"
import { RecipeVersion } from "../models/recipeVersion"

@Component({
    selector: "recipes-details",
    templateUrl: "./details.component.html"
})
export class DetailsComponent implements OnInit {

    recipe = new Recipe();
    selectedVersion = new RecipeVersion();

    constructor(private readonly route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.recipe = this.route.snapshot.data["recipe"];
        const recipeVersions = this.recipe.recipeVersions;
        if (recipeVersions instanceof Array) {
            const lastIndex = recipeVersions.length - 1;
            this.selectedVersion = recipeVersions[lastIndex];
        }
    }

    selectVersion(recipeVersion: RecipeVersion): void {
        this.selectedVersion = recipeVersion;
    }
}
