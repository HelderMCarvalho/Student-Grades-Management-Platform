import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user';
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
    get userValue() {
        return this.userSubject.value;
    }

    /**
     * POST credentials for authentication.
     * @param email User email
     * @param password User password
     */
    login(email: string, password: string) {
        return this.http.post<AuthResponse>(`${environment.apiUrl}/authentication`, {email, password})
            .pipe(map(user => {
                // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
                user.authdata = window.btoa(email + ':' + password);
                localStorage.setItem('user', JSON.stringify(user.response.data.user));
                this.userSubject.next(user);
                return user;
            }));
    }

    /**
     * POST User for registration.
     * @param newUser User information
     */
    register(newUser: User) {
        return this.http.post<AuthResponse>(`${environment.apiUrl}/authentication/register`, {newUser})
            .pipe(map(user => { return user; }));
    }

    /**
     * Performs logout.
     */
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }
}

export class AuthResponse {
    authdata: string;
    response: {
        data: {
            message: string,
            user: User
        }
    }
}
