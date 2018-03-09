import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  moduleId: module.id,
  selector: 'shop',  // <shop></shop>
  styleUrls: [ '../../../assets/css/shop.component.css' ],
  templateUrl: '../../templates/shop.component.html'
})
export class ShopComponent {
    currentUser: User;
    user: User[] = [];

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //this.userService.getById(this.currentUser.id).subscribe(user => { this.user = user; });
    }
}