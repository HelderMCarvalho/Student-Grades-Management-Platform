import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add header with basic auth credentials if user is logged in and request is to the api url
        if ((this.authenticationService.userValue && this.authenticationService.userValue.authdata)
            && request.url.startsWith(environment.apiUrl)) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Basic ${this.authenticationService.userValue.authdata}`
                }
            });
        }
        return next.handle(request);
    }
}
