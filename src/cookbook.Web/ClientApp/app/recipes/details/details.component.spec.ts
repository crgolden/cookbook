import { } from "jasmine";

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { RouterLinkDirectiveStub } from "../../../test/router-link-directive-stub";
import { DetailsPage } from "../../../test/page-models/recipes/details-page"
import { DetailsComponent } from "./details.component";
import { Recipe } from "../models/recipe"
import { RecipeVersion } from "../models/recipeVersion"

const options = { year: "numeric", month: "short", day: "numeric" },
    recipeId = "1",
    title1 = "Sushi (Crab Roll)",
    description1 = "How to make crab roll sushi.",
    dateCreated1 = new Date(),
    dateCreated1Text = dateCreated1.toLocaleDateString("en-US", options),
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
let component: DetailsComponent,
    fixture: ComponentFixture<DetailsComponent>,
    page: DetailsPage,
    routerLinks: RouterLinkDirectiveStub[],
    routerLinkDebugElements: DebugElement[];

@Component({ selector: "router-outlet", template: "" })
class RouterOutletStubComponent { }

describe("DetailsComponent", () => {

    beforeEach(() => {
        setup();
    });

    it("should have recipe", () => {
        expect(component.recipe.id).toBe(recipeId);
    });

    it("should have last recipeVersion as selectedVersion", () => {
        expect(component.selectedVersion.recipeId).toBe(recipeId);
        expect(component.selectedVersion.title).toBe(title2);
        expect(component.selectedVersion.description).toBe(description2);
        expect(component.selectedVersion.dateCreated).toBe(dateCreated2);
    });

    it("should display list of recipeVersions", () => {
        let recipeVersion1Text = page.recipeVersions[0].textContent,
            recipeVersion2Text = page.recipeVersions[1].textContent;

        if (recipeVersion1Text != null) {
            recipeVersion1Text = recipeVersion1Text.trim();
        } else {
            recipeVersion1Text = "";
        }
        if (recipeVersion2Text != null) {
            recipeVersion2Text = recipeVersion2Text.trim();
        } else {
            recipeVersion2Text = "";
        }

        expect(recipeVersion1Text).toBe(`1. ${dateCreated1Text} - ${title1}`);
        expect(recipeVersion2Text).toBe(`2. ${dateCreated2Text} - ${title2}`);
    });

    it("should display selectedVersion details", () => {
        expect(page.title).toBe(title2);
        expect(page.description).toBe(description2);
        expect(page.dateCreated).toBe(dateCreated2Text);
    });

    it("can change selectedVersion", () => {
        const firstRecipeVersionLink = page.details[3],
            secondRecipeVersionLink = page.details[4];

        firstRecipeVersionLink.click();
        fixture.detectChanges();

        expect(component.selectedVersion.title).toBe(title1);
        expect(component.selectedVersion.description).toBe(description1);
        expect(component.selectedVersion.dateCreated).toBe(dateCreated1);
        expect(page.title).toBe(title1);
        expect(page.description).toBe(description1);
        expect(page.dateCreated).toBe(dateCreated1Text);

        secondRecipeVersionLink.click();
        fixture.detectChanges();

        expect(component.selectedVersion.title).toBe(title2);
        expect(component.selectedVersion.description).toBe(description2);
        expect(component.selectedVersion.dateCreated).toBe(dateCreated2);
        expect(page.title).toBe(title2);
        expect(page.description).toBe(description2);
        expect(page.dateCreated).toBe(dateCreated2Text);
    });

    it("can get RouterLinks from template", () => {
        expect(routerLinks.length).toBe(4, "should have 4 routerLinks");
        expect(routerLinks[0].linkParams).toBe(`/Recipes/Edit/${recipe.id}`);
        expect(routerLinks[1].linkParams).toBe(`/Recipes/Delete/${recipe.id}`);
        expect(routerLinks[2].linkParams).toBe("/Recipes");
        expect(routerLinks[3].linkParams).toBe("/Home");
    });

    it("can click Recipes/Edit/:recipeId link in template", () => {
        const recipe1LinkDebugElement = routerLinkDebugElements[0],
            recipe1Link = routerLinks[0];

        expect(recipe1Link.navigatedTo).toBeNull("should not have navigated yet");

        recipe1LinkDebugElement.triggerEventHandler("click", null);
        fixture.detectChanges();

        expect(recipe1Link.navigatedTo).toBe(`/Recipes/Edit/${recipeId}`);
    });

    it("can click Recipes/Delete/:recipeId link in template", () => {
        const recipe2LinkDebugElement = routerLinkDebugElements[1],
            recipe2Link = routerLinks[1];

        expect(recipe2Link.navigatedTo).toBeNull("should not have navigated yet");

        recipe2LinkDebugElement.triggerEventHandler("click", null);
        fixture.detectChanges();

        expect(recipe2Link.navigatedTo).toBe(`/Recipes/Delete/${recipeId}`);
    });

    it("can click Recipes link in template", () => {
        const recipesLinkDebugElement = routerLinkDebugElements[2],
            recipesLink = routerLinks[2];

        expect(recipesLink.navigatedTo).toBeNull("should not have navigated yet");

        recipesLinkDebugElement.triggerEventHandler("click", null);
        fixture.detectChanges();

        expect(recipesLink.navigatedTo).toBe("/Recipes");
    });

    it("can click Home link in template", () => {
        const homeLinkDebugElement = routerLinkDebugElements[3],
            homeLink = routerLinks[3];

        expect(homeLink.navigatedTo).toBeNull("should not have navigated yet");

        homeLinkDebugElement.triggerEventHandler("click", null);
        fixture.detectChanges();

        expect(homeLink.navigatedTo).toBe("/Home");
    });

});

function setup() {
    TestBed.configureTestingModule({
        declarations: [
            DetailsComponent,
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
            }
        ]
    });
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    page = new DetailsPage(fixture);
    fixture.detectChanges();
    routerLinkDebugElements = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
    routerLinks = routerLinkDebugElements.map(de => de.injector.get(RouterLinkDirectiveStub));
}
