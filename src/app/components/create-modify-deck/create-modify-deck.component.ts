import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { CardService } from '../../services/card.service';
import { HerosService } from '../../services/hero.service';

import { User } from '../../models/user';
import { Card } from '../../models/card';
import { Deck } from '../../models/deck';
import { Hero } from '../../models/hero';
import { Error } from '../../models/error';

@Component({
  moduleId: module.id,
  selector: 'create-modify-deck',
  styleUrls: [ '../../../assets/css/create-modify-deck.component.css' ],
  templateUrl: '../../templates/create-modify-deck.component.html'
})
export class CreateModifyDeckComponent {
    private sub: any;
    public deck: Deck;
    public cardsListDeck: Card[] = [];
    public cards_all: Card[] = [];
    private currentUser: User;
    public display_cards: Card[] = [];
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
    public heros: Hero[] = [];
    public is_hero_display: boolean = false;
    public hero: Hero;
    private factions: any[] = [
        {ID: 1, Name: 'Neutral'},
        {ID: 2, Name: 'Alliance'},
        {ID: 3, Name: 'Horde'}
    ];
  
    //zoom card
    public zoomCard: Card = null;
    public countInDeck = 0;
    public collection: number = 0;
    public isDisplayRemove: boolean = false;
    public isDisplayAdd: boolean = false;
    private error: Error = null;

    constructor(
        private userService: UserService,
        private cardProvider: CardService,
        private herosProvider: HerosService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit() {
        this.sub = this.route
        .queryParams
        .subscribe(params => {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            let res = JSON.parse(params.params);
            this.deck = res.deck;
            this.hero = res.hero;
            // //to modify -----------------------------
            this.heros = this.herosProvider.getAll();
            // //---------------------------------------
            this.getAllCards();
        },
      error => {
        this.error = new Error("Erreur", error, 3, true);
      });
    }

    private getCardById(id: Number) {
        for (let i = 0; i < this.cards_all.length; i += 1) {
          if (this.cards_all[i].ID === id) {
            return this.cards_all[i];
          }
        }
        return null;
      }
    
      private getAllCards() {
        this.cardProvider.getCards(this.currentUser["token"])
          .subscribe(
            cards => {
              this.cards_all = cards;
              if (this.deck === null) {
                console.log(this.hero);
                this.deck = new Deck(-1, this.currentUser.ID, 0, this.hero.ID, 'New', null, null, null, null, null,
                null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
                let i = 0;
                while (i < 20) {
                  this.cardsListDeck.push(null);
                  i += 1;
                }
                this.displaySelectChamp();
              } else {
                this.cardsListDeck.push(this.getCardById(this.deck.Card_1_id));
                this.cardsListDeck.push(this.getCardById(this.deck.Card_2_id));
                this.cardsListDeck.push(this.getCardById(this.deck.Card_3_id));
                this.cardsListDeck.push(this.getCardById(this.deck.Card_4_id));
                this.cardsListDeck.push(this.getCardById(this.deck.Card_5_id));
                this.cardsListDeck.push(this.getCardById(this.deck.Card_6_id));
                this.cardsListDeck.push(this.getCardById(this.deck.Card_7_id));
                this.cardsListDeck.push(this.getCardById(this.deck.Card_8_id));
                this.cardsListDeck.push(this.getCardById(this.deck.Card_9_id));
                this.cardsListDeck.push(this.getCardById(this.deck.Card_10_id));
                this.cardsListDeck.push(this.getCardById(this.deck.Card_11_id));
                this.cardsListDeck.push(this.getCardById(this.deck.Card_12_id));
                this.cardsListDeck.push(this.getCardById(this.deck.Card_13_id));
                this.cardsListDeck.push(this.getCardById(this.deck.Card_14_id));
                this.cardsListDeck.push(this.getCardById(this.deck.Card_15_id));
                this.cardsListDeck.push(this.getCardById(this.deck.Card_16_id));
                this.cardsListDeck.push(this.getCardById(this.deck.Card_17_id));
                this.cardsListDeck.push(this.getCardById(this.deck.Card_18_id));
                this.cardsListDeck.push(this.getCardById(this.deck.Card_19_id));
                this.cardsListDeck.push(this.getCardById(this.deck.Card_20_id));
                for (let j = 0; j < this.cards_all.length; j += 1) {
                  for (let i = 0; i < this.cardsListDeck.length; i += 1) {
                    if (this.cards_all[j].ID === this.cardsListDeck[i].ID) {
                      this.cards_all[j].Number -= 1;
                    }
                  }
                }
              }
              for (let i = 0; i < this.cards_all.length; i += 1) {
                if (this.cards_all[i].Faction === this.getFaction(this.hero) || this.cards_all[i].Faction === "Neutral") {
                  this.display_cards.push(this.cards_all[i]);
                }
              }
            },
            error => {
              this.error = new Error("Erreur", error, 3, true);
            }
          );
      }
    
      private getFaction(hero: Hero) {
        for(let i = 0; i < this.factions.length; i += 1) {
          if (this.factions[i].ID === hero.Faction_id) {
              return this.factions[i].Name;
          }
        }
        return null;
      }
    
      public displaySelectChamp() {
        this.is_hero_display = true;
      }
    
      public allowDrop(ev) {
        ev.preventDefault();
      }
    
      public drag(ev, card, index) {
        ev.dataTransfer.setData("card", JSON.stringify(card));
      }
    
      public dropInDeck(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("card");
        data = JSON.parse(data)
        this.addCard(data);
      }
    
      public dropInCardsList(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("card");
        var index = ev.dataTransfer.getData("index");
        this.cardsListDeck[Number(index)] = null;
        for (let i = Number(index); i < this.cardsListDeck.length; i += 1) {
          if (i + 1 === this.cardsListDeck.length) {
            this.cardsListDeck[i] = null;
          } else {
            this.cardsListDeck[i] = this.cardsListDeck[i+1];
          }
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
    
      public onChangeFilter(event) {
        this.display_cards = this.cards_all;
        this.filterFaction();
        this.filterType();
        this.filterRarity();
        this.filterCost();
      }
    
      private filterFaction() {
        let tmp: Card[] = [];
        for (let i = 0; i < this.display_cards.length; i += 1) {
          if (this.display_cards[i].Faction === this.hero.getFaction() || this.cards_all[i].Faction === "Neutral") {
            tmp.push(this.display_cards[i]);
          }
        }
        this.display_cards = tmp;
      }
    
      private filterType() {
        let tmp: Card[] = [];
        if (this.type != 'Tous') {
          for (let i = 0; i < this.display_cards.length; i += 1) {
            if (this.display_cards[i].Type === this.type) {
              tmp.push(this.display_cards[i]);
            }
          }
          this.display_cards = tmp;
        }
      }
    
      private filterCost() {
        let tmp: Card[] = [];
        if (this.cost != -1) {
          for (let i = 0; i < this.display_cards.length; i +=1) {
            if (this.display_cards[i].Cost == this.cost) {
              tmp.push(this.display_cards[i]);
            }
          }
          this.display_cards = tmp;
        }
      }
    
      private filterRarity() {
        let tmp: Card[] = [];
        if (this.rarity != 0) {
          for (let i = 0; i < this.display_cards.length; i += 1) {
            if (this.display_cards[i].Rarity_id.valueOf() == this.rarity) {
              tmp.push(this.display_cards[i]);
            }
          }
          this.display_cards = tmp;
        }
      }
    
      public saveDeck() {
        if (this.cardsListDeck[0] != null) {
          this.deck.Card_1_id = this.cardsListDeck[0].ID;
        } else {
          this.deck.Card_1_id = null;
        }
        if (this.cardsListDeck[1] != null) {
          this.deck.Card_2_id = this.cardsListDeck[1].ID;
        } else {
          this.deck.Card_2_id = null;
        }
        if (this.cardsListDeck[2] != null) {
          this.deck.Card_3_id = this.cardsListDeck[2].ID;
        } else {
          this.deck.Card_3_id = null;
        }
        if (this.cardsListDeck[3] != null) {
          this.deck.Card_4_id = this.cardsListDeck[3].ID;
        } else {
          this.deck.Card_4_id = null;
        }
        if (this.cardsListDeck[4] != null) {
          this.deck.Card_5_id = this.cardsListDeck[4].ID;
        } else {
          this.deck.Card_5_id = null;
        }
        if (this.cardsListDeck[5] != null) {
          this.deck.Card_6_id = this.cardsListDeck[5].ID;
        } else {
          this.deck.Card_6_id = null;
        }
        if (this.cardsListDeck[6] != null) {
          this.deck.Card_7_id = this.cardsListDeck[6].ID;
        } else {
          this.deck.Card_7_id = null;
        }
        if (this.cardsListDeck[7] != null) {
          this.deck.Card_8_id = this.cardsListDeck[7].ID;
        } else {
          this.deck.Card_8_id = null;
        }
        if (this.cardsListDeck[8] != null) {
          this.deck.Card_9_id = this.cardsListDeck[8].ID;
        } else {
          this.deck.Card_9_id = null;
        }
        if (this.cardsListDeck[9] != null) {
          this.deck.Card_10_id = this.cardsListDeck[9].ID;
        } else {
          this.deck.Card_10_id = null;
        }
        if (this.cardsListDeck[10] != null) {
          this.deck.Card_11_id = this.cardsListDeck[10].ID;
        } else {
          this.deck.Card_11_id = null;
        }
        if (this.cardsListDeck[11] != null) {
          this.deck.Card_12_id = this.cardsListDeck[11].ID;
        } else {
          this.deck.Card_12_id = null;
        }
        if (this.cardsListDeck[12] != null) {
          this.deck.Card_13_id = this.cardsListDeck[12].ID;
        } else {
          this.deck.Card_13_id = null;
        }
        if (this.cardsListDeck[13] != null) {
          this.deck.Card_14_id = this.cardsListDeck[13].ID;
        } else {
          this.deck.Card_14_id = null;
        }
        if (this.cardsListDeck[14] != null) {
          this.deck.Card_15_id = this.cardsListDeck[14].ID;
        } else {
          this.deck.Card_15_id = null;
        }
        if (this.cardsListDeck[15] != null) {
          this.deck.Card_16_id = this.cardsListDeck[15].ID;
        } else {
          this.deck.Card_16_id = null;
        }
        if (this.cardsListDeck[16] != null) {
          this.deck.Card_17_id = this.cardsListDeck[16].ID;
        } else {
          this.deck.Card_17_id = null;
        }
        if (this.cardsListDeck[17] != null) {
          this.deck.Card_18_id = this.cardsListDeck[17].ID;
        } else {
          this.deck.Card_18_id = null;
        }
        if (this.cardsListDeck[18] != null) {
          this.deck.Card_19_id = this.cardsListDeck[18].ID;
        } else {
          this.deck.Card_19_id = null;
        }
        if (this.cardsListDeck[19] != null) {
          this.deck.Card_20_id = this.cardsListDeck[19].ID;
        } else {
          this.deck.Card_20_id = null;
        }
        if (this.deck.ID === -1) {
          this.cardProvider.createDeck(this.deck, this.currentUser["token"])
          .subscribe(
            results => {
              if (results === 'ok') {
                this.error = new Error("Succes", "Deck créé", 3, false);
              } else {
                this.error = new Error("Erreur", "Impossible de créer le deck", 3, true);
              }
            }
          );
        } else {
           this.cardProvider.modifyDeck(this.deck.ID, this.deck, this.currentUser["token"])
          .subscribe(
            results => {
              if (results === 'ok') {
                this.error = new Error("Succes", "Deck modifié", 3, false);
              } else {
                this.error = new Error("Erreur", "Impossible de modifier le deck", 3, true);
              }
            }
          );
        }
        
      }
    
      public displayZoom(card: Card) {
        let zoomBlock = document.getElementById("zoom_card");
        zoomBlock.classList.add("show");
        this.collection = card.Number;
        this.zoomCard = card;
        for (let i = 0; i < this.cardsListDeck.length; i += 1) {
          if (this.cardsListDeck[i] != null) {
            if (this.cardsListDeck[i].ID === card.ID) {
              this.countInDeck += 1;
              this.collection -= 1;
            }
          }
        }
        if (this.countInDeck > 0) {
          this.isDisplayRemove = true;
        }
        if (this.collection > 0) {
          this.isDisplayAdd = true;
        }
      }
    
      public closeZoom() {
        let zoomBlock = document.getElementById("zoom_card");
        zoomBlock.classList.remove("show");
        this.countInDeck = 0;
        this.collection = 0;
        this.isDisplayRemove = false;
        this.isDisplayAdd = false;
        this.zoomCard = null;
      }
    
      public addCard(data: Card) {
        for (let i = 0; i < this.cardsListDeck.length; i += 1) {
          if (this.cardsListDeck[i] === null) {
            this.cardsListDeck[i] = data;
            this.collection -= 1;
            this.countInDeck += 1;
            this.isDisplayRemove = true;
            this.cardsListDeck[i].Number -= 1;
            return;
          }
        }
      }
    
      public removeCard(card: Card) {
        let isMove = false;
        let isInDeck = false;
        for (let i = 0; i < this.cardsListDeck.length; i += 1) {
          if (this.cardsListDeck[i] != null) {
            if (this.cardsListDeck[i].ID === card.ID) {
              if (!isMove) {
                this.collection += 1;
                this.countInDeck -= 1;
                this.cardsListDeck[i].Number += 1;
              }
              isMove = true;
            }
            if (isMove) {
              if (i < 20) {
                if (this.cardsListDeck[i].ID === card.ID) {
                  isInDeck = true;
                }
                this.cardsListDeck[i] = this.cardsListDeck[i+1];
              } else {
                this.cardsListDeck[i] = null;
              }
            }
          } else {
            this.cardsListDeck[i] = null;
          }
        }
        if (!isInDeck) {
          this.isDisplayRemove = false;
        }
      }
}
