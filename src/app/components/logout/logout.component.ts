import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
    moduleId: module.id,
    templateUrl: '../../templates/logout.component.html',
    providers: [UserService]
})

export class LogoutComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private userService: UserService) {}

    ngOnInit(): void {
        // reset login status
        this.userService.logout();
        this.router.navigate(['']);
    }
}
