import {Routes} from '@angular/router';

import {DashboardComponent} from '../../dashboard/dashboard.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {TableListComponent} from '../../table-list/table-list.component';
import {TypographyComponent} from '../../typography/typography.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {CreateEditClassComponent} from '../../_class/create-edit-class/create-edit-class.component';
import {ListClassesComponent} from '../../_class/list-classes/list-classes.component';

export const AdminLayoutRoutes: Routes = [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'class/list', component: ListClassesComponent},
    {path: 'class/create', component: CreateEditClassComponent},
    {path: 'class/edit/:_id_class', component: CreateEditClassComponent},

    {path: 'user-profile', component: UserProfileComponent},
    {path: 'table-list', component: TableListComponent},
    {path: 'typography', component: TypographyComponent},
    {path: 'notifications', component: NotificationsComponent},
];
