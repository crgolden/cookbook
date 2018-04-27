import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";

import { AppService } from "../app.service";
import { Recipe } from "./models/recipe"
import { RecipeVersion } from "./models/recipeVersion"

@Injectable()
export class RecipesService extends AppService {

    constructor(private readonly http: HttpClient) {
        super();
    }

    index(): Observable<Recipe[] | string> {
        return this.http
            .get<Recipe[]>("/Recipes/Index")
            .catch(this.handleError);
    }

    details(id: string | null): Observable<Recipe[] | Recipe | string> {
        return this.http
            .get<Recipe>(`/Recipes/Details?id=${id}`)
            .catch(this.handleError);
    }

    create(recipeVersion: RecipeVersion): Observable<string> {
        const body = JSON.stringify(recipeVersion),
            options = { headers: this.getHeaders() };
        
        return this.http
            .post<string>("/Recipes/Create", body, options)
            .catch(this.handleError);
    }

    edit(recipeVersion: RecipeVersion) {
        const body = JSON.stringify(recipeVersion),
            options = { headers: this.getHeaders() };
        
        return this.http
            .put(`/Recipes/Edit?id=${recipeVersion.recipeId}`, body, options)
            .catch(this.handleError);
    }

    delete(id: string | undefined) {
        const options = { headers: this.getHeaders() };

        return this.http
            .delete(`/Recipes/Delete?id=${id}`, options)
            .catch(this.handleError);
    }
}