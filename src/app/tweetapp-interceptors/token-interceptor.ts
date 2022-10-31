import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserServiceService } from "../tweetapp-services/user-service.service";

@Injectable({
    providedIn: 'root'
})

export class TokenInterceptor implements HttpInterceptor {

    constructor(public userService: UserServiceService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authRequest = req;
        if (authRequest.url == "http://localhost:9009/api/v1.0/tweets/login") {
            localStorage.clear();
        }
        const tokenString = this.userService.getToken();
        if (tokenString != null) {
            let tempToken = 'Bearer ' + tokenString;
            authRequest = authRequest.clone({
                headers: authRequest.headers.set('Authorization', 'Bearer ' + tokenString)

            });
        }
        return next.handle(authRequest);
    }

}

export const authInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true,
    }
];