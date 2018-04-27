import { Injectable, Output, EventEmitter } from "@angular/core"
import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class AppService {

    protected handleError(error: any): Observable<string> {
        const applicationError = error.headers.get("Application-Error");

        if (applicationError) {
            return Observable.throw(applicationError);
        }

        let modelStateErrors: string = "";

        if (!error.type) {
            for (let key in error) {
                if (error.hasOwnProperty(key) && error[key])
                    modelStateErrors += error[key] + "\n";
            }
        }

        return Observable.throw(modelStateErrors || "Server error");
    }

    protected getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': "application/json"
        });
    }
}