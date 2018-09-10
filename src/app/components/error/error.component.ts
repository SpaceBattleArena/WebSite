import { Component, OnInit, Input } from '@angular/core';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Error } from '../../models/error';

@Component({
  moduleId: module.id,
  selector: 'error',  // <error></error>
  inputs: ['type', 'message'],
  styleUrls: [ '../../../assets/css/error.component.css' ],
  templateUrl: '../../templates/error.component.html'
})
export class ErrorComponent implements OnInit {
    currentUser: User;
    user: User[] = [];
    @Input() error: Error = null;

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //this.userService.getById(this.currentUser.id).subscribe(user => { this.user = user; });
    }

    ngOnInit() {

    }

    private closeWindow() {
        this.error = null;
    }
}