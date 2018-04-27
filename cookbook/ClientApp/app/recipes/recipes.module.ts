import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { IndexComponent } from "./index/index.component"
import { DetailsComponent } from "./details/details.component"
import { CreateComponent } from "./create/create.component"
import { EditComponent } from "./edit/edit.component"
import { DeleteComponent } from "./delete/delete.component"

import { RecipesService } from "./recipes.service"
import { IndexResolver } from "./index/index.resolver"
import { DetailsResolver } from "./details/details.resolver"

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forChild([
            { path: "Recipes", component: IndexComponent, resolve: { recipes: IndexResolver } },
            { path: "Recipes/Details/:id", component: DetailsComponent, resolve: { recipe: DetailsResolver } },
            { path: "Recipes/Create", component: CreateComponent },
            { path: "Recipes/Edit/:id", component: EditComponent, resolve: { recipe: DetailsResolver } },
            { path: "Recipes/Delete/:id", component: DeleteComponent, resolve: { recipe: DetailsResolver } }
        ])
    ],
    declarations: [
        IndexComponent,
        DetailsComponent,
        CreateComponent,
        EditComponent,
        DeleteComponent
    ],
    providers: [
        RecipesService,
        IndexResolver,
        DetailsResolver
    ]
})
export class RecipesModule {
}