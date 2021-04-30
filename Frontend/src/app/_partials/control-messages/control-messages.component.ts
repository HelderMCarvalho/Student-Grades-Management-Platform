import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {ValidationService} from '../../validation.service';

@Component({
    selector: 'app-control-messages',
    templateUrl: './control-messages.component.html',
    styleUrls: ['./control-messages.component.css']
})
export class ControlMessagesComponent {

    @Input() control: AbstractControl;

    constructor(private validationService: ValidationService) { }

    get errorMessage() {
        for (const propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                return this.validationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
            }
        }
        return null;
    }
}
