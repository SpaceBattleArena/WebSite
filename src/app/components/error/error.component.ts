import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  moduleId: module.id,
  selector: 'error',  // <error></error>
  inputs: ['type', 'message'],
  styleUrls: [ '../../../assets/css/error.component.css' ],
  templateUrl: '../../templates/error.component.html'
})
export class ErrorComponent {
    currentUser: User;
    user: User[] = [];
    type: string = "";
    message: string = "";

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //this.userService.getById(this.currentUser.id).subscribe(user => { this.user = user; });
    }
}