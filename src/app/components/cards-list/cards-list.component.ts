import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import {CardService} from '../../services/card.service';
import {Card} from '../../models/card';
import { Error } from '../../models/error';

@Component({
  moduleId: module.id,
  selector: 'cards-list',
  styleUrls: [ '../../../assets/css/cards-list.component.css' ],
  templateUrl: '../../templates/cards-list.component.html'
})
export class CardsListComponent {
  public currentUser: User;
  public cards_all: Card[] = [];
  public cards_user: Card[] = [];
  public cards_missing: Card[] = [];
  public display_cards: any[] = [];
  private is_displayCard = false;
  public is_possesses = true;
  public is_missing = false;
  public is_all = false;
  public faction: string = 'Toutes';
  public factions_list: string[] = [
    'Toutes',
    'Neutral',
    'Alliance'
  ];
  public type: string = 'Tous';
  public types_list: string[] = [
    'Tous',
    'Spatialship',
    'Equipement'
  ];
  public cost: number = -1;
  public rarity = 0;
  public rarities_list = [
    'Toutes',
    'Commune',
    'Non commune',
    'Rare',
    'Epic',
    'Mythic'
  ];
  private error: Error = null;

    constructor(private userService: UserService, private cardProvider: CardService) {
    }

    ngOnInit() {
        this.is_displayCard = false;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.cardProvider.getCards(this.currentUser["token"])
          .subscribe(
            cards => {
              this.cards_user = cards;
              this.cardProvider.getAll()
                .subscribe(
                  cards => {
                    this.cards_all = cards;
                    for (let i = 0; i < this.cards_all.length; i += 1) {
                      if (this.getIDs(this.cards_user).indexOf(this.cards_all[i].ID.valueOf()) === -1) {
                        this.cards_missing.push(this.cards_all[i]);
                      }
                    }
                  },
                  error => {
                    this.error = new Error("Erreur", error, 3, true);
                  }
                )
              this.only_possessed(this.cards_user);
            },
            error => {
              this.error = new Error("Erreur", error, 3, true);
            }
          );
    }

    displayCard(index: number) {
        this.is_displayCard = true;
        //this.navCtrl.push(CardPage, {card: this.display_cards[index]}); --> redirect
    }

    changeToPossesses() {
        this.is_possesses = true;
        this.is_missing = false;
        this.is_all = false;
        this.onChangeFilter(null);
      }
    
      changeToMissing() {
        this.is_possesses = false;
        this.is_missing = true;
        this.is_all = false;
        this.onChangeFilter(null);
      }
    
      changeToAll() {
        this.is_possesses = false;
        this.is_missing = false;
        this.is_all = true;
        this.onChangeFilter(null);
      }
    
      onChangeFilter(event) {
        if (this.is_possesses) {
          this.only_possessed(this.cards_user);
        } else if (this.is_missing) {
          this.only_missing(this.cards_missing);
        } else {
          this.both(this.cards_all);
        }
        this.filterFaction();
        this.filterType();
        this.filterRarity();
        this.filterCost();
      }
    
      private only_possessed(cards) {
        this.display_cards = [];
        for (let i = 0; i < cards.length; i += 1) {
          this.display_cards.push({card:cards[i], value:'possessed'});
        }
      }
    
      private only_missing(cards) {
        this.display_cards = [];
        for (let i = 0; i < cards.length; i += 1) {
          this.display_cards.push({card:cards[i], value:'missing'});
        }
      }
    
      private both(cards) {
        this.display_cards = [];
        for (let i = 0; i < cards.length; i += 1) {
          if (this.getIDs(this.cards_user).indexOf(cards[i].ID.valueOf()) != -1) {
            this.display_cards.push({card:cards[i], value:'possessed'});
          } else {
            this.display_cards.push({card:cards[i], value:'missing'});
          }
        }
      }
    
      private getIDs(cards) {
        let tab_id = [];
        for (let i = 0; i < cards.length; i += 1) {
          tab_id.push(cards[i].ID);
        }
        return tab_id;
      }
    
      private filterFaction() {
        let tmp: Card[] = [];
        if (this.faction != 'Toutes') {
          for (let i = 0; i < this.display_cards.length; i += 1) {
            if (this.display_cards[i].card.Faction === this.faction) {
              tmp.push(this.display_cards[i].card);
            }
          }
          this.both(tmp);
        }
      }
    
      private filterType() {
        let tmp: Card[] = [];
        if (this.type != 'Tous') {
          for (let i = 0; i < this.display_cards.length; i += 1) {
            if (this.display_cards[i].card.Type === this.type) {
              tmp.push(this.display_cards[i].card);
            }
          }
          this.both(tmp);
        }
      }
    
      private filterCost() {
        let tmp: Card[] = [];
        if (this.cost != -1) {
          for (let i = 0; i < this.display_cards.length; i +=1) {
            if (this.display_cards[i].card.Cost == this.cost) {
              tmp.push(this.display_cards[i].card);
            }
          }
          this.both(tmp);
        }
      }
    
      private filterRarity() {
        let tmp: Card[] = [];
        if (this.rarity != 0) {
          for (let i = 0; i < this.display_cards.length; i += 1) {
            if (this.display_cards[i].card.Rarity_id.valueOf() == this.rarity) {
              tmp.push(this.display_cards[i].card);
            }
          }
          this.both(tmp);
        }
      }
    
      public displayFilters() {
        let filters_container = document.getElementById("filters");
        filters_container.classList.add("show");
        let filters_black_screen = document.getElementById("filter-black-screen");
        filters_black_screen.classList.add("show");
      }
    
      public hideFilters() {
        let filters_container = document.getElementById("filters");
        filters_container.classList.remove("show");
        let filters_black_screen = document.getElementById("filter-black-screen");
        filters_black_screen.classList.remove("show");
      }
}
