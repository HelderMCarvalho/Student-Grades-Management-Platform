import {Routes} from '@angular/router';

import {DashboardComponent} from '../../dashboard/dashboard.component';
import {CreateEditClassComponent} from '../../_class/create-edit-class/create-edit-class.component';
import {ListClassesComponent} from '../../_class/list-classes/list-classes.component';
import {SeeClassComponent} from '../../_class/see-class/see-class.component';

export const AdminLayoutRoutes: Routes = [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'class/list', component: ListClassesComponent},
    {path: 'class/see/:_id_class', component: SeeClassComponent},
    {path: 'class/create', component: CreateEditClassComponent},
    {path: 'class/edit/:_id_class', component: CreateEditClassComponent},
];
