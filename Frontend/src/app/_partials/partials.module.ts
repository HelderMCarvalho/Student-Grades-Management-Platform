import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ControlMessagesComponent} from './control-messages/control-messages.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        ControlMessagesComponent
    ],
    exports: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        ControlMessagesComponent
    ]
})
export class PartialsModule {
}
