import { } from "jasmine";

import { ComponentFixture, TestBed, fakeAsync } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { RouterLinkDirectiveStub } from "../../../test/router-link-directive-stub";
import { DeletePage } from "../../../test/page-models/recipes/delete-page"
import { DeleteComponent } from "./delete.component";
import { Recipe } from "../models/recipe"
import { RecipeVersion } from "../models/recipeVersion"
import { RecipesService } from "../recipes.service"

const options = { year: "numeric", month: "short", day: "numeric" },
    recipeId = "1",
    title1 = "Sushi (Crab Roll)",
    description1 = "How to make crab roll sushi.",
    dateCreated1 = new Date(),
    title2 = "Sushi (Tuna Roll)",
    description2 = "How to make tuna roll sushi.",
    dateCreated2 = new Date(dateCreated1.getDate() + 1),
    dateCreated2Text = dateCreated2.toLocaleDateString("en-US", options),
    recipeVersion1: RecipeVersion = {
        recipeId: recipeId,
        title: title1,
        description: description1,
        dateCreated: dateCreated1
    },
    recipeVersion2: RecipeVersion = {
        recipeId: recipeId,
        title: title2,
        description: description2,
        dateCreated: dateCreated2
    },
    recipe: Recipe = {
        id: recipeId,
        recipeVersions: [recipeVersion1, recipeVersion2]
    };
let component: DeleteComponent,
    fixture: ComponentFixture<DeleteComponent>,
    page: DeletePage,
    routerLinks: RouterLinkDirectiveStub[],
    routerLinkDebugElements: DebugElement[],
    recipesService: RecipesService,
    router: Router;

@Component({ selector: "router-outlet", template: "" })
class RouterOutletStubComponent { }

describe("DeleteComponent", () => {

    beforeEach(() => {
        setup();
    });

    it("should have last recipeVersion as recipeVersion", () => {
        expect(component.recipeVersion.recipeId).toBe(recipeId);
        expect(component.recipeVersion.title).toBe(title2);
        expect(component.recipeVersion.description).toBe(description2);
        expect(component.recipeVersion.dateCreated).toBe(dateCreated2);
    });

    it("should display recipeVersion details", () => {
        expect(page.title).toBe(title2);
        expect(page.description).toBe(description2);
        expect(page.dateCreated).toBe(dateCreated2Text);
    });

    it("should call delete and navigate on submit", () => {
        fakeAsync(() => {
            component.delete();
            expect(recipesService.delete).toHaveBeenCalled();
            expect(router.navigateByUrl).toHaveBeenCalled();
        });
    });

    it("can get RouterLinks from template", () => {
        expect(routerLinks.length).toBe(2, "should have 2 routerLinks");
        expect(routerLinks[0].linkParams).toBe("/Recipes");
        expect(routerLinks[1].linkParams).toBe("/Home");
    });

    it("can click Recipes link in template", () => {
        const recipesLinkDebugElement = routerLinkDebugElements[0],
            recipesLink = routerLinks[0];

        expect(recipesLink.navigatedTo).toBeNull("should not have navigated yet");

        recipesLinkDebugElement.triggerEventHandler("click", null);
        fixture.detectChanges();

        expect(recipesLink.navigatedTo).toBe("/Recipes");
    });

    it("can click Home link in template", () => {
        const homeLinkDebugElement = routerLinkDebugElements[1],
            homeLink = routerLinks[1];

        expect(homeLink.navigatedTo).toBeNull("should not have navigated yet");

        homeLinkDebugElement.triggerEventHandler("click", null);
        fixture.detectChanges();

        expect(homeLink.navigatedTo).toBe("/Home");
    });

});

function setup() {
    TestBed.configureTestingModule({
        declarations: [
            DeleteComponent,
            RouterLinkDirectiveStub,
            RouterOutletStubComponent
        ],
        providers: [
            {
                provide: ActivatedRoute,
                useValue: {
                    snapshot: {
                        data: { "recipe": recipe }
                    }
                }
            },
            {
                provide: Router,
                useValue: jasmine.createSpyObj("Router", ["navigateByUrl"])
            },
            {
                provide: RecipesService,
                useValue: jasmine.createSpyObj("RecipesService", ["delete"])
            }
        ]
    });
    fixture = TestBed.createComponent(DeleteComponent);
    component = fixture.componentInstance;
    recipesService = fixture.debugElement.injector.get(RecipesService);
    router = fixture.debugElement.injector.get(Router);
    page = new DeletePage(fixture);
    fixture.detectChanges();
    routerLinkDebugElements = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
    routerLinks = routerLinkDebugElements.map(de => de.injector.get(RouterLinkDirectiveStub));
}
