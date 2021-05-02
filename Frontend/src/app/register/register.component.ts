import {Component, OnInit} from '@angular/core';
import {ValidationService} from '../validation.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';
import {User} from '../_models/user';
import {first} from 'rxjs/operators';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
            inputFirstName: ['', Validators.required],
            inputLastName: ['', Validators.required],
            inputPassword: ['', [Validators.required, this.validationService.passwordValidator()]],
            inputConfirmPassword: ['', Validators.required]
        }, {
            validator: this.validationService.MatchPassword('inputPassword', 'inputConfirmPassword')
        });
    }

    /**
     * Form submission.
     * Sends credentials to authentication service.
     */
    submitRegister() {
        if (this.registerForm.invalid) {
            return;
        }

        const newUser = new User(this.registerForm.get('inputEmail').value, this.registerForm.get('inputPassword').value,
            this.registerForm.get('inputFirstName').value, this.registerForm.get('inputLastName').value);
        this.authenticationService.register(newUser).pipe(first()).subscribe(() => {
            this.router.navigate(['/login']);
        }, error => {
            this.error = error;
        });
    }
}