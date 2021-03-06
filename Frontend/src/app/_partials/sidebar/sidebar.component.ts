import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../_services/authentication.service';
import {Teacher} from '../../_models/teacher';

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    {path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: ''},
    {path: '/class/list', title: 'Classes', icon: 'group', class: ''},
    {path: '/class/see', title: 'See Class', icon: '', class: 'hidden'},
    {path: '/class/create', title: 'Create Class', icon: '', class: 'hidden'},
    {path: '/class/edit', title: 'Edit Class', icon: '', class: 'hidden'},
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: RouteInfo[];
    logedUser: Teacher;

    constructor(private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.logedUser = this.authenticationService.userValue.response.data.teacher;
    }

    logout() {
        this.authenticationService.logout();
    }

    isMobileMenu() {
        return $(window).width() <= 991;
    };
}
