import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../validation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';
import {first} from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    returnUrl: string;
    error = '';
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
            inputPassword: ['', Validators.compose([Validators.required, this.validationService.passwordValidator()])]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    submitLogin(): void {
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.authenticationService.login(this.loginForm.controls.inputEmail.value, this.loginForm.controls.inputPassword.value)
            .pipe(first()).subscribe(() => {
            this.router.navigate([this.returnUrl]);
        }, error => {
            this.error = error;
        });
    }
}
