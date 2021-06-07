import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppRoutingModule} from './app.routing';
import {PartialsModule} from './_partials/partials.module';

import {AppComponent} from './app.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {LoginComponent} from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {AuthInterceptor} from './_services/auth.interceptor';
import {ErrorInterceptor} from './_services/error.interceptor';
import {RegisterComponent} from './register/register.component';
import {CreateEditClassComponent} from './_class/create-edit-class/create-edit-class.component';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {ListClassesComponent} from './_class/list-classes/list-classes.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {SeeClassComponent} from './_class/see-class/see-class.component';
import {DialogCreateEditNoteComponent} from './_class/dialog-create-edit-note/dialog-create-edit-note.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {DialogCreateEditEvaluationComponent} from './_class/dialog-create-edit-evaluation/dialog-create-edit-evaluation.component';

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
        MatSelectModule,
        MatAutocompleteModule,
        MatChipsModule,
        MatIconModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatDialogModule,
        MatDividerModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        LoginComponent,
        RegisterComponent,
        CreateEditClassComponent,
        ListClassesComponent,
        SeeClassComponent,
        DialogCreateEditNoteComponent,
        DialogCreateEditEvaluationComponent,
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
