import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Error } from '../../models/error';

@Component({
  moduleId: module.id,
  selector: 'about',  // <smithy></smithy>
  styleUrls: [ '../../../assets/css/about.component.css' ],
  templateUrl: '../../templates/about.component.html'
})
export class AboutComponent {
    currentUser: User;
    user: User[] = [];
    private error: Error = null;

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //this.userService.getById(this.currentUser.id).subscribe(user => { this.user = user; });
    }
}