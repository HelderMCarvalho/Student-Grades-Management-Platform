import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';


import {AppRoutingModule} from './app.routing';
import {PartialsModule} from './partials/partials.module';

import {AppComponent} from './app.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        PartialsModule,
        RouterModule,
        AppRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        LoginComponent,

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
