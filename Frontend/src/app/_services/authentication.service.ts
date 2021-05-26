import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Teacher} from '../_models/teacher';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private userSubject: BehaviorSubject<AuthResponse>;
    user: Observable<AuthResponse>;

    constructor(private router: Router, private http: HttpClient) {
        this.userSubject = new BehaviorSubject<AuthResponse>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    /**
     * Get logged user.
     */
    get userValue(): AuthResponse {
        return JSON.parse(localStorage.getItem('teacher'));
    }

    /**
     * POST credentials for authentication.
     * @param email User email
     * @param password User password
     */
    login(email: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${environment.apiUrl}/authentication`, {email, password})
            .pipe(map(response => {
                // Save Teacher details and basic auth credentials in local storage to keep Teacher logged in between page refreshes
                response.authdata = window.btoa(email + ':' + password);
                localStorage.setItem('teacher', JSON.stringify(response));
                this.userSubject.next(response);
                return response;
            }));
    }

    /**
     * POST User for registration.
     * @param newUser User information
     */
    register(newUser: Teacher): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${environment.apiUrl}/authentication/register`, {newUser})
            .pipe(map(user => { return user; }));
    }

    /**
     * Performs logout.
     */
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('teacher');
        this.userSubject.next(null);
        this.router.navigate(['/login']).then();
    }
}

export class AuthResponse {
    authdata: string;
    response: {
        data: {
            message: string,
            teacher: Teacher
        }
    }
}
