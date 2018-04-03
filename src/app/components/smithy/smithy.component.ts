import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  moduleId: module.id,
  selector: 'smithy',  // <smithy></smithy>
  styleUrls: [ '../../../assets/css/smithy.component.css' ],
  templateUrl: '../../templates/smithy.component.html'
})
export class SmithyComponent {
    currentUser: User;
    user: User[] = [];

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    forge() {
        console.log('ok');
    }
}
