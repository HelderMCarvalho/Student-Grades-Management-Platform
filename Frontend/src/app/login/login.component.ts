import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../validation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';
import {first} from 'rxjs/operators';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

    // Subscriptions aggregator, push all "subscribes" here to be able to destroy all of them at once
    subscriptions: Subscription[] = [];

    returnUrl: string;
    error = false;
    loginForm: FormGroup;

    constructor(private validationService: ValidationService, private formBuilder: FormBuilder, private router: Router,
                private authenticationService: AuthenticationService, private route: ActivatedRoute) {
        // redirect to home if already logged in
        if (this.authenticationService.userValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            inputEmail: ['', [Validators.required, Validators.email]],
            inputPassword: ['', [Validators.required, this.validationService.passwordValidator()]]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        this.subscriptions.push(
            this.loginForm.valueChanges.subscribe(() => {
                if (this.error) {
                    this.error = false;
                }
            })
        );
    }

    ngOnDestroy() {
        // Destroy all subscriptions
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    /**
     * Form submission.
     * Sends credentials to authentication service.
     */
    submitLogin(): void {
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.subscriptions.push(
            this.authenticationService.login(this.loginForm.controls.inputEmail.value, this.loginForm.controls.inputPassword.value)
                .pipe(first()).subscribe(() => { this.router.navigate([this.returnUrl]); }, () => { this.error = true; })
        );
    }
}
