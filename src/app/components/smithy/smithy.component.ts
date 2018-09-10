import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import {CardService} from '../../services/card.service';
import {Card} from '../../models/card';
import { Error } from '../../models/error';

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
    private error: Error = null;

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
                this.error = new Error("Erreur", 'You don\'t have enough part to buy a booster!', 3, true);
            } else {
                this.error = new Error("Erreur", 'An error occured, please try again later.', 3, true);
            }
        });
    }
}
