import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Recipe } from "../models/recipe"

@Component({
    selector: "recipes-index",
    templateUrl: "./index.component.html"
})
export class IndexComponent implements OnInit {

    recipes: Recipe[] = [];

    constructor(private readonly route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.recipes = this.route.snapshot.data["recipes"];
    }
}
