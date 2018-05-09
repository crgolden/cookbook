import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";

import { AppService } from "../app.service";
import { Recipe } from "./models/recipe"

@Injectable()
export class RecipesService extends AppService {

    constructor(private readonly http: HttpClient) {
        super();
    }

    index(): Observable<Recipe[] | string> {
        return this.http
            .get<Recipe[]>("/api/Recipes/Index")
            .catch(this.handleError);
    }

    details(id: string | null): Observable<Recipe[] | Recipe | string> {
        return this.http
            .get<Recipe>(`/api/Recipes/Details/${id}`)
            .catch(this.handleError);
    }

    create(recipe: Recipe): Observable<string | Recipe> {
        const body = JSON.stringify(recipe),
            options = { headers: this.getHeaders() };
        
        return this.http
            .post<Recipe>("/api/Recipes/Create", body, options)
            .catch(this.handleError);
    }

    edit(recipe: Recipe) {
        const body = JSON.stringify(recipe),
            options = { headers: this.getHeaders() };

        return this.http
            .put(`/api/Recipes/Edit/${recipe.id}`, body, options)
            .catch(this.handleError);
    }

    delete(id: string | undefined) {
        const options = { headers: this.getHeaders() };

        return this.http
            .delete(`/api/Recipes/Delete/${id}`, options)
            .catch(this.handleError);
    }
}