import { } from "jasmine";

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

import { RouterLinkDirectiveStub } from "../../../test/router-link-directive-stub";
import { IndexPage } from "../../../test/page-models/recipes/index-page"
import { IndexComponent } from "./index.component";
import { Recipe } from "../models/recipe"
import { RecipeVersion } from "../models/recipeVersion"

const options = { year: "numeric", month: "short", day: "numeric" },
    recipeId1 = "1",
    recipeId2 = "2",
    title1 = "Sushi (Crab Roll)",
    description1 = "How to make crab roll sushi.",
    dateCreated1 = new Date(),
    dateCreated1Text = dateCreated1.toLocaleDateString("en-US", options),
    title2 = "Sushi (Tuna Roll)",
    description2 = "How to make tuna roll sushi.",
    dateCreated2 = new Date(dateCreated1.getDate() + 1),
    dateCreated2Text = dateCreated2.toLocaleDateString("en-US", options),
    title3 = "Ice Cream (Chocolate)",
    description3 = "How to make chocolate ice cream.",
    dateCreated3 = new Date(),
    dateCreated3Text = dateCreated3.toLocaleDateString("en-US", options),
    title4 = "Ice Cream (Strawberry)",
    description4 = "How to make strawberry ice cream.",
    dateCreated4 = new Date(dateCreated3.getDate() + 1),
    dateCreated4Text = dateCreated4.toLocaleDateString("en-US", options),
    recipeVersion1: RecipeVersion = {
        recipeId: recipeId1,
        title: title1,
        description: description1,
        dateCreated: dateCreated1
    },
    recipeVersion2: RecipeVersion = {
        recipeId: recipeId1,
        title: title2,
        description: description2,
        dateCreated: dateCreated2
    },
    recipeVersion3: RecipeVersion = {
        recipeId: recipeId2,
        title: title3,
        description: description3,
        dateCreated: dateCreated3
    },
    recipeVersion4: RecipeVersion = {
        recipeId: recipeId2,
        title: title4,
        description: description4,
        dateCreated: dateCreated4
    },
    recipe1: Recipe = {
        id: recipeId1,
        recipeVersions: [recipeVersion1, recipeVersion2]
    },
    recipe2: Recipe = {
        id: recipeId2,
        recipeVersions: [recipeVersion3, recipeVersion4]
    },
    recipes: Array<Recipe> = [recipe1, recipe2];
let component: IndexComponent,
    fixture: ComponentFixture<IndexComponent>,
    page: IndexPage,
    routerLinks: RouterLinkDirectiveStub[],
    routerLinkDebugElements: DebugElement[];

@Component({ selector: "router-outlet", template: "" })
class RouterOutletStubComponent { }

describe("IndexComponent", () => {

    beforeEach(() => {
        setup();
    });

    it("should have recipes", () => {
        expect(component.recipes.length).toBe(2);
    });

    it("should display recipes", () => {
        let recipeRow1 = page.rows[1],
            recipeRow1Title = recipeRow1.children[0].textContent,
            recipeRow1DateCreated = recipeRow1.children[1].textContent,
            recipeRow2 = page.rows[2],
            recipeRow2Title = recipeRow2.children[0].textContent,
            recipeRow2DateCreated = recipeRow2.children[1].textContent;

        if (recipeRow1Title != null) {
            recipeRow1Title = recipeRow1Title.trim();
        } else {
            recipeRow1Title = "";
        }
        if (recipeRow1DateCreated != null) {
            recipeRow1DateCreated = recipeRow1DateCreated.trim();
        } else {
            recipeRow1DateCreated = "";
        }
        if (recipeRow2Title != null) {
            recipeRow2Title = recipeRow2Title.trim();
        } else {
            recipeRow2Title = "";
        }
        if (recipeRow2DateCreated != null) {
            recipeRow2DateCreated = recipeRow2DateCreated.trim();
        } else {
            recipeRow2DateCreated = "";
        }

        // Displays the most recent title
        expect(recipeRow1Title).not.toBe(title1);
        expect(recipeRow1Title).toBe(title2);
        // Displays the oldest creation date
        expect(recipeRow1DateCreated).toBe(dateCreated1Text);
        expect(recipeRow1DateCreated).not.toBe(dateCreated2Text);

        // Displays the most recent title
        expect(recipeRow2Title).not.toBe(title3);
        expect(recipeRow2Title).toBe(title4);
        // Displays the oldest creation date
        expect(recipeRow2DateCreated).toBe(dateCreated3Text);
        expect(recipeRow2DateCreated).not.toBe(dateCreated4Text);
    });

    it("can get RouterLinks from template", () => {
        expect(routerLinks.length).toBe(4, "should have 4 routerLinks");
        expect(routerLinks[0].linkParams).toBe(`/Recipes/Details/${recipes[0].id}`);
        expect(routerLinks[1].linkParams).toBe(`/Recipes/Details/${recipes[1].id}`);
        expect(routerLinks[2].linkParams).toBe("/Recipes/Create");
        expect(routerLinks[3].linkParams).toBe("/Home");
    });

    it("can click Recipes/Details/:recipes[0].id link in template", () => {
        const recipe1LinkDebugElement = routerLinkDebugElements[0],
            recipe1Link = routerLinks[0];

        expect(recipe1Link.navigatedTo).toBeNull("should not have navigated yet");

        recipe1LinkDebugElement.triggerEventHandler("click", null);
        fixture.detectChanges();

        expect(recipe1Link.navigatedTo).toBe(`/Recipes/Details/${recipes[0].id}`);
    });

    it("can click Recipes/Details/:recipes[1].id link in template", () => {
        const recipe2LinkDebugElement = routerLinkDebugElements[1],
            recipe2Link = routerLinks[1];

        expect(recipe2Link.navigatedTo).toBeNull("should not have navigated yet");

        recipe2LinkDebugElement.triggerEventHandler("click", null);
        fixture.detectChanges();

        expect(recipe2Link.navigatedTo).toBe(`/Recipes/Details/${recipes[1].id}`);
    });

    it("can click Recipes/Create link in template", () => {
        const createLinkDebugElement = routerLinkDebugElements[2],
            createLink = routerLinks[2];

        expect(createLink.navigatedTo).toBeNull("should not have navigated yet");

        createLinkDebugElement.triggerEventHandler("click", null);
        fixture.detectChanges();

        expect(createLink.navigatedTo).toBe("/Recipes/Create");
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
            IndexComponent,
            RouterLinkDirectiveStub,
            RouterOutletStubComponent
        ],
        providers: [
            {
                provide: ActivatedRoute,
                useValue: {
                    snapshot: {
                        data: { "recipes": recipes }
                    }
                }
            },
            {
                provide: Router,
                useValue: jasmine.createSpyObj("Router", ["navigateByUrl"])
            }
        ]
    });
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    page = new IndexPage(fixture);
    fixture.detectChanges();
    routerLinkDebugElements = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
    routerLinks = routerLinkDebugElements.map(de => de.injector.get(RouterLinkDirectiveStub));
}
