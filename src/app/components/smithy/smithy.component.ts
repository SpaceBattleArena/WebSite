import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import {CardService} from '../../services/card.service';
import {Card} from '../../models/card';

@Component({
  moduleId: module.id,
  selector: 'smithy',  // <smithy></smithy>
  styleUrls: [ '../../../assets/css/smithy.component.css' ],
  templateUrl: '../../templates/smithy.component.html'
})
export class SmithyComponent {
    currentUser: User;
    user: User[] = [];
    selectedCard: Card;
    successMessage: boolean = false;
    errorMessage: string = '';

    constructor(private userService: UserService, private cardService: CardService) {
    }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    forge() {
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
