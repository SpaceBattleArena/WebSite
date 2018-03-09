import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  moduleId: module.id,
  selector: 'headerClient',
  styleUrls: [ '../../../assets/css/header.component.css' ],
  templateUrl: '../../templates/header.component.html'
})
export class HeaderComponent {
    currentUser: User;
    user: User[] = [];
    is_staff = false;

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser) {
            this.userService.getInformation(this.currentUser["token"])
                .subscribe(
                    resultArray => {
                        this.is_staff = resultArray["results"]["data"][0]["Is_staff"];
                    }
                )
        }
    }
}