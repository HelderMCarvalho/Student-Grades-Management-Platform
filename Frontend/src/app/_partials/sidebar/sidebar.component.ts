import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../_services/authentication.service';
import {User} from '../../_models/user';

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    {path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: ''},
    {path: '/user-profile', title: 'User Profile', icon: 'person', class: ''},
    {path: '/table-list', title: 'Table List', icon: 'content_paste', class: ''},
    {path: '/typography', title: 'Typography', icon: 'library_books', class: ''},
    {path: '/icons', title: 'Icons', icon: 'bubble_chart', class: ''},
    {path: '/notifications', title: 'Notifications', icon: 'notifications', class: ''},
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: RouteInfo[];
    logedUser: User;

    constructor(private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.logedUser = this.authenticationService.userValue;
    }

    isMobileMenu() {
        return $(window).width() <= 991;
    };
}
