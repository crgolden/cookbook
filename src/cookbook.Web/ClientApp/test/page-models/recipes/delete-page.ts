import { ComponentFixture } from "@angular/core/testing";

import { DeleteComponent } from "../../../app/recipes/delete/delete.component"
import { QueryHelpers } from "../../query-helpers"

export class DeletePage {
    constructor(fixture: ComponentFixture<DeleteComponent>) {
        this.fixture = fixture;
    }

    fixture: ComponentFixture<DeleteComponent>;

    get details() {
        return QueryHelpers.queryAll<HTMLElement>(this.fixture, "dd");
    }
    get title() {
        let title = this.details[0].textContent;
        if (typeof title === "string") {
            title = title.trim();
        }
        return title;
    }
    get description() {
        let description = this.details[1].textContent;
        if (typeof description === "string") {
            description = description.trim();
        }
        return description;
    }
    get dateCreated() {
        let dateCreated = this.details[2].textContent;
        if (typeof dateCreated === "string") {
            dateCreated = dateCreated.trim();
        }
        return dateCreated;
    }
}
