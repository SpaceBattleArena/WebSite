import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import {CardService} from '../../services/card.service';

@Component({
  moduleId: module.id,
  selector: 'shop',  // <shop></shop>
  styleUrls: [ '../../../assets/css/shop.component.css' ],
  templateUrl: '../../templates/shop.component.html'
})
export class ShopComponent {
    currentUser: User;
    user: User[] = [];

    constructor(private userService: UserService, private cardService: CardService) {
        //this.userService.getById(this.currentUser.id).subscribe(user => { this.user = user; });
    }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    buy() {
        this.cardService.buyBooster()
    }
}