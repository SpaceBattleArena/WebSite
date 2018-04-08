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
    notEnoughGold: boolean = false;

    constructor(private userService: UserService, private cardService: CardService) {
    }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    forge() {
        if (this.currentUser.gold >= this.selectedCard.Cost) {
            this.notEnoughGold = false;
            this.cardService.getCards(this.currentUser['token']).subscribe(data => data.log());
        } else {
            this.notEnoughGold = true;
        }
    }
}
