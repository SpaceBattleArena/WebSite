import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 

import { UserService } from '../../services/user.service';
import { CardService } from '../../services/card.service';
import { HerosService } from '../../services/hero.service';

import { User } from '../../models/user';
import { Card } from '../../models/card';
import { Deck } from '../../models/deck';
import { Hero } from '../../models/hero';

@Component({
  moduleId: module.id,
  selector: 'decks-list',
  styleUrls: [ '../../../assets/css/decks-list.component.css' ],
  templateUrl: '../../templates/decks-list.component.html'
})
export class DecksListComponent {
    private currentUser: User;
    public decks: Deck[] = [];
    public ModifyParams: any[] = [];
    public createParams: any [] = [];
    public herosDeck: any[] = [];
    public heros: Hero[] = [];

    constructor(private userService: UserService, private cardProvider: CardService, private herosProvider: HerosService, private router: Router) {
    }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //to modify -----------------------------
        this.heros = this.herosProvider.getAll();
        //---------------------------------------
        if (this.currentUser != null) {
          this.getDecks();
        }
        for (let i = 0; i < this.heros.length; i += 1) {
          this.createParams.push(JSON.stringify({deck: null, hero: this.heros[i]}));
        }
    }

    public createModifyRedicrect(param, index) {
        //ModifyParams[index]
        this.router.navigate(['/smithy/create_modify_deck', { queryParams: { index: index, test: 'test' } }]);
    }

    private getDecks() {
        if (this.currentUser["token"] != undefined && this.currentUser["token"] != null && this.currentUser["token"] != "") {
          this.cardProvider.getDecks(this.currentUser["token"])
            .subscribe(
              results => {
                this.decks = results;
                for (let i = 0; i < this.heros.length; i += 1) {
                  this.herosDeck.push({
                      hero: this.heros[i],
                      decks: []
                    });
                }
                for (let i = 0; i < this.decks.length; i += 1) {
                  for (let j = 0; j < this.herosDeck.length; j += 1) {
                    if (this.herosDeck[j].hero.ID === this.decks[i].Hero_id) {
                      this.herosDeck[j].decks.push(this.decks[i]);
                      this.ModifyParams.push(JSON.stringify({deck: this.decks[i], hero: this.herosDeck[j].hero}));
                    }
                  }
                }
              },
              error => {
                console.log(error);
              }
            );
        } else {
          console.log('no current user');
        }
      }
}
