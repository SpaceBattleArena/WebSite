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
    successMessage: boolean = false;
    errorMessage: string = '';
    extensions: string[] = [
        "Terra",
        "Luna",
        "Black Hole",
        "Nova",
        "Star",
        "Glass Hole",
        "Centorius",
    ];

    constructor(private userService: UserService, private cardService: CardService) {
    }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    buy() {
        this.successMessage = false;
        this.cardService.buyBooster(this.currentUser['token']).subscribe((data) => {
            if (data['results']['status'] == 201) {
                    this.successMessage = true;
                } else if (data['results']['status'] == 403) {
                    this.errorMessage = 'You don\'t have enough part to buy a booster!';
                } else {
                    this.errorMessage = 'An error occured, please try again later.';
                }
            });
    }
}