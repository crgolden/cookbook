import { } from "jasmine";

import { ComponentFixture, TestBed, fakeAsync } from "@angular/core/testing";
import { Router } from "@angular/router";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { RouterLinkDirectiveStub } from "../../../test/router-link-directive-stub";
import { CreatePage } from "../../../test/page-models/recipes/create-page"
import { CreateComponent } from "./create.component";
import { RecipesService } from "../recipes.service"

let component: CreateComponent,
    fixture: ComponentFixture<CreateComponent>,
    page: CreatePage,
    routerLinks: RouterLinkDirectiveStub[],
    routerLinkDebugElements: DebugElement[],
    recipesService: RecipesService,
    router: Router;

@Component({ selector: "router-outlet", template: "" })
class RouterOutletStubComponent { }

describe("EditComponent", () => {

    beforeEach(() => {
        setup();
    });

    it("should have a new recipeVersion", () => {
        expect(component.recipeVersion.recipeId).toBeUndefined();
        expect(component.recipeVersion.title).toBeUndefined();
        expect(component.recipeVersion.description).toBeUndefined();
        expect(component.recipeVersion.dateCreated).toBeUndefined();
    });

    it("should display blank title and description", () => {
        fixture.whenStable().then(() => {
            expect(page.title.value).toBe("");
            expect(page.description.value).toBe("");
        });
    });

    it("should call create and navigate on submit", () => {
        fakeAsync(() => {
            component.create(true);
            expect(recipesService.create).toHaveBeenCalled();
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
        imports: [FormsModule],
        declarations: [
            CreateComponent,
            RouterLinkDirectiveStub,
            RouterOutletStubComponent
        ],
        providers: [
            {
                provide: Router,
                useValue: jasmine.createSpyObj("Router", ["navigateByUrl"])
            },
            {
                provide: RecipesService,
                useValue: jasmine.createSpyObj("RecipesService", ["create"])
            }
        ]
    });
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    recipesService = fixture.debugElement.injector.get(RecipesService);
    router = fixture.debugElement.injector.get(Router);
    page = new CreatePage(fixture);
    fixture.detectChanges();
    routerLinkDebugElements = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
    routerLinks = routerLinkDebugElements.map(de => de.injector.get(RouterLinkDirectiveStub));
}
