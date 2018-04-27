import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";

import { RecipesService } from "../recipes.service"
import { Recipe } from "../models/recipe"

@Injectable()
export class IndexResolver implements Resolve<Recipe[] | Recipe | string> {

    constructor(private readonly recipesService: RecipesService) {
    }
    resolve(route: ActivatedRouteSnapshot) {
        return this.recipesService.index();
    }
}