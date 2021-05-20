import {Component, OnDestroy, OnInit} from '@angular/core';
import {ValidationService} from '../validation.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';
import {Teacher} from '../_models/teacher';
import {first} from 'rxjs/operators';
import {Subscription} from 'rxjs/Subscription';
import {sha512} from 'js-sha512';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

    // Subscriptions aggregator, push all "subscribes" here to be able to destroy all of them at once
    subscriptions: Subscription[] = [];

    error: string;
    registerForm: FormGroup;

    constructor(private validationService: ValidationService, private formBuilder: FormBuilder, private router: Router,
                private authenticationService: AuthenticationService) {
        // redirect to home if already logged in
        if (this.authenticationService.userValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            inputEmail: ['', [Validators.required, Validators.email]],
            inputCode: ['', Validators.required],
            inputFirstName: ['', Validators.required],
            inputLastName: ['', Validators.required],
            inputPassword: ['', [Validators.required, this.validationService.passwordValidator()]],
            inputConfirmPassword: ['', Validators.required]
        }, {
            validator: this.validationService.MatchPassword('inputPassword', 'inputConfirmPassword')
        });
    }

    ngOnDestroy() {
        // Destroy all subscriptions
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    /**
     * Form submission.
     * Sends credentials to authentication service.
     */
    submitRegister() {
        if (this.registerForm.invalid) {
            return;
        }

        const newUser = new Teacher(this.registerForm.get('inputEmail').value, this.registerForm.get('inputCode').value,
            sha512(this.registerForm.get('inputPassword').value), this.registerForm.get('inputFirstName').value,
            this.registerForm.get('inputLastName').value);
        this.subscriptions.push(
            this.authenticationService.register(newUser).pipe(first()).subscribe(() => {
                this.router.navigate(['/login']);
            }, error => {
                this.error = error;
            })
        );
    }
}
