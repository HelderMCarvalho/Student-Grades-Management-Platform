import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../validation.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    loginForm: FormGroup;

    constructor(private validationService: ValidationService, private formBuilder: FormBuilder) {
        this.loginForm = formBuilder.group({
            inputEmail: ['', [Validators.required, Validators.email]],
            inputPassword: ['', Validators.compose([Validators.required, this.validationService.passwordValidator()])]
        });
    }

    submitLogin(): void {
        alert(this.loginForm.get('inputEmail').value + '\n' + this.loginForm.get('inputPassword').value);
    }
}
