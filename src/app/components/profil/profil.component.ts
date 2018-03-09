import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { CardService } from '../../services/card.service'

@Component({
    moduleId: module.id,
    styleUrls: [ '../../../assets/css/profil.component.css' ],
    templateUrl: '../../templates/profil.component.html',
    providers: [UserService, CardService]
})

export class ProfilComponent implements OnInit {
    currentUser: User;
    user: User = new User();
    user_information: any;
    is_disabled = true;
    cards: any = [];
    decks: any = [];
    rank: any;
    skins: any = [];
    translateBase = 50;
    translate = 50;
    
    constructor(private userService: UserService, private cardService: CardService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //this.userService.getById(this.currentUser.id).subscribe(user => { this.user = user; });
    }

    activate_modifications() {
        this.is_disabled = false;
    }

    // modify() {
    //     this.userService.update(this.currentUser);
    //     this.is_disabled = true;
    // }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser) {
            this.userService.getInformation(this.currentUser["token"])
                .subscribe(
                    resultArray => {
                        if(resultArray["results"] != undefined) {
                            this.user = resultArray["results"]["data"][0];
                            this.userService.getById(this.user.ID)
                                .subscribe(
                                    resultArray => {
                                        this.user_information = resultArray["results"]["data"][0];
                                        if (this.user_information.Arena_id === null) {
                                            this.user_information.Arena_id = 0;
                                        }
                                        $("#arena-point-user").css("width", this.user_information.Arena_id.toString() + "%")
                                    }
                                )
                        }
                    }
                );
            this.cardService.getCards(this.currentUser["token"])
                .subscribe(
                    resultArray => {
                        this.cards = resultArray["results"]["cards"];
                        /*to remove*/
                        // this.cards = [
                        //     {"Cost": 2, "Name": "Ship", "Type": "ShipType", "HP": 20},
                        //     {"Cost": 2, "Name": "Ship", "Type": "ShipType", "HP": 20},
                        //     {"Cost": 2, "Name": "Ship", "Type": "ShipType", "HP": 20},
                        //     {"Cost": 2, "Name": "Ship", "Type": "ShipType", "HP": 20},
                        //     {"Cost": 2, "Name": "Ship", "Type": "ShipType", "HP": 20},
                        //     {"Cost": 2, "Name": "Ship", "Type": "ShipType", "HP": 20},
                        //     {"Cost": 2, "Name": "Ship", "Type": "ShipType", "HP": 20},
                        //     {"Cost": 2, "Name": "Ship", "Type": "ShipType", "HP": 20},
                        //     {"Cost": 2, "Name": "Ship", "Type": "ShipType", "HP": 20},
                        //     {"Cost": 2, "Name": "Ship", "Type": "ShipType", "HP": 20},
                        //     {"Cost": 2, "Name": "Ship", "Type": "ShipType", "HP": 20},
                        //     {"Cost": 2, "Name": "Ship", "Type": "ShipType", "HP": 20},
                        //     {"Cost": 2, "Name": "Ship", "Type": "ShipType", "HP": 20},
                        //     {"Cost": 2, "Name": "Ship", "Type": "ShipType", "HP": 20},
                        // ];
                        // console.log(this.cards);
                    }
                );
            this.cardService.getDecks(this.currentUser["token"])
                .subscribe(
                    resultArray => {
                        this.decks = resultArray["decks"];
                    }
                );
            this.cardService.getRank(this.currentUser["token"])
                .subscribe(
                    resultArray => {
                        this.rank = resultArray["results"]["data"][0];
                    }
                );
        }
    }

    move(position: number, status: string) {
        let translateTo = 10 * position;
        $("#line-vertical").css('height', '0');
        $("#line-vertical").css('transform', 'translateY(500px)');
        $("#status").css('opacity', '0');
        $("#opponent_info").css('opacity', 0);
        $("#user_info").css('opacity', 0);
        let id = setInterval(first_frame, 15, this);

        function first_frame(profil: any) {
            if (profil.translate == profil.translateBase - translateTo || profil.translate < -50 || profil.translate > 50) {
                clearInterval(id);
                profil.display_informations(status);
            } else {
                if (profil.translate < profil.translateBase - translateTo) {
                    profil.translate += 1;
                } else {
                    profil.translate -= 1;
                }
                $("#points-container").css('transform', 'translateX(' + profil.translate + '%)');
                $("#date-game").css('transform', 'translateX(' + profil.translate + '%)');
            }
        }
    }

    display_informations(status: string) {
        let pos = 0;
        if (status === 'win') {
            $("#line-vertical").removeClass('loose');
            $("#line-vertical").addClass('win');
            document.getElementById('status-text').innerHTML = "WIN";
        } else {
            $("#line-vertical").addClass('loose');
            $("#line-vertical").removeClass('win');
            document.getElementById('status-text').innerHTML = "LOOSE";
        }
        let id = setInterval(second_frame, 1);

        function second_frame() {
            if (pos == 50) {
                clearInterval(id);
                $("#status").css('opacity', '1');
            } else {
                pos += 1;
                $("#line-vertical").css('height', (pos * 10) + 'px');
                $("#line-vertical").css('transform', 'translateY(' + (500 - (pos * 10)) + 'px)');
                $("#opponent_info").css('opacity', (pos / 50));
                $("#user_info").css('opacity', (pos / 50));
            }
        }
    }

    displayInformation(value: string) {
        if (value === "history") {
            $("#history").css('display', 'block');
            $("#cards").css('display', 'none');
            $("#decks").css('display', 'none');
            $("#skins").css('display', 'none');
            $("#history-link").addClass('select');
            $("#cards-link").removeClass('select');
            $("#decks-link").removeClass('select');
            $("#skins-link").removeClass('select');
        } else if (value === "cards") {
            $("#history").css('display', 'none');
            $("#cards").css('display', 'block');
            $("#decks").css('display', 'none');
            $("#skins").css('display', 'none');
            $("#history-link").removeClass('select');
            $("#cards-link").addClass('select');
            $("#decks-link").removeClass('select');
            $("#skins-link").removeClass('select');
        } else if (value === "decks") {
            $("#history").css('display', 'none');
            $("#cards").css('display', 'none');
            $("#decks").css('display', 'block');
            $("#skins").css('display', 'none');
            $("#history-link").removeClass('select');
            $("#cards-link").removeClass('select');
            $("#decks-link").addClass('select');
            $("#skins-link").removeClass('select');
        } else if (value === "skins") {
            $("#history").css('display', 'none');
            $("#cards").css('display', 'none');
            $("#decks").css('display', 'none');
            $("#skins").css('display', 'block');
            $("#history-link").removeClass('select');
            $("#cards-link").removeClass('select');
            $("#decks-link").removeClass('select');
            $("#skins-link").addClass('select');
        }
    }

    @HostListener("window:scroll", [])
    on_scroll() {
        let scroll = document.documentElement.scrollTop;
        document.getElementById("overview").style.transform = "translateX(" + (scroll/100) + "vw)";
    }
}