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
    public extensions: any[] = [
        {name: "Terra", sprite: "../../assets/img/booster.png"},
        {name: "Luna", sprite: "../../assets/img/booster.png"},
        {name: "Black Hole", sprite: "../../assets/img/booster.png"},
        {name: "Nova", sprite: "../../assets/img/booster.png"},
        {name: "Star", sprite: "../../assets/img/booster.png"},
        {name: "Glass Hole", sprite: "../../assets/img/booster.png"},
        {name: "Centorius", sprite: "../../assets/img/booster.png"},
      ];
    public boosterPayment: string = "../../assets/img/booster.png";
    public namePayment: string = "Name";

    constructor(private userService: UserService, private cardService: CardService) {
    }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.userService.getInformation(this.currentUser["token"])
          .subscribe(
            resultArray => {
              if(resultArray["results"] != undefined) {
                this.user = resultArray["results"]["data"][0];
              }
            }
          );
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

    public isConfirmPayment(index: number) {
      this.boosterPayment = this.extensions[index].sprite;
      this.namePayment = this.extensions[index].name;
      let booster = document.getElementById("booster_"+index.toString());
      let paymentBox = document.getElementById("confirm_payment");
      let box = document.getElementById("box");
      let nameBlock = document.getElementById("name_block");
      let cancelPayment = document.getElementById("cancelPayment");
      let validPayment = document.getElementById("validPayment");
      let boosterPaymentBlock = document.getElementById("booster_payment") as HTMLImageElement;
      let pos = booster.getBoundingClientRect();
      let paymentBoxHeight = pos.bottom - pos.top;
      let boxMarginTop: number = paymentBoxHeight / 2;
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;
  
      paymentBox.style.top = pos.top.toString() + "px";
      paymentBox.style.left = pos.left.toString() + "px";
      paymentBox.style.width = (pos.right - pos.left).toString() + "px";
      box.style.height = (paymentBoxHeight / 2).toString() + "px";
      box.style.marginTop = boxMarginTop.toString() + "px";
      nameBlock.style.top = (boxMarginTop * 0.85).toString() + "px";
  
      let blackScreen = document.getElementById("confirm-black-screen");
      blackScreen.style.display = "block";
      paymentBox.style.display = "block";
  
      let posPayment = paymentBox.getBoundingClientRect();
      let paymentWidth = posPayment.right - posPayment.left;
      let diffWidth = 0;
      let diffTop = 0;
      let diffLeft = 0;
      if (windowWidth < windowHeight) {
        diffWidth = (window.innerWidth * 0.5882) - paymentWidth;
        diffTop = (window.innerHeight * 0.2564) - posPayment.top;
        diffLeft = ((window.innerWidth - (window.innerWidth * 0.5882)) / 2) - posPayment.left;
        boosterPaymentBlock.style.marginLeft = "30%";
      } else {
        diffWidth = (window.innerWidth * 0.25) - paymentWidth;
        diffTop = (window.innerHeight * 0.10) - posPayment.top;
        diffLeft = (window.innerWidth * 0.375) - posPayment.left;
        boosterPaymentBlock.style.marginLeft = "0px";
      }
      let value = 0;
        let idInterval = setInterval(frame, 1, paymentBox, paymentWidth, diffWidth, diffTop, diffLeft, posPayment, box, nameBlock, boosterPaymentBlock, cancelPayment, validPayment);
      function frame(paymentBox, paymentWidth, diffWidth, diffTop, diffLeft, posPayment, box, nameBlock, boosterPaymentBlock: HTMLImageElement, cancelPayment, validPayment) {
        if (value <= 50) {
          value += 1;
          paymentBox.style.width = (paymentWidth + (value * 2 * (diffWidth / 100))).toString() + "px";
          if (diffTop < 0) {
            paymentBox.style.top = (posPayment.top - (value * 2 * ((diffTop * (-1)) / 100))).toString() + "px";
          } else if (diffTop > 0) {
            paymentBox.style.top = (posPayment.top + (value * 2 * (diffTop / 100))).toString() + "px";
          }
          if (diffLeft < 0) {
            paymentBox.style.left = (posPayment.left - (value * 2 * ((diffLeft * (-1)) / 100))).toString() + "px";
          } else if (diffLeft > 0) {
            paymentBox.style.left = (posPayment.left + (value * 2 * (diffLeft / 100))).toString() + "px";
          }
          paymentBox.style.height = boosterPaymentBlock.clientHeight.toString() + "px";
          box.style.height = (paymentBox.offsetHeight / 2).toString() + "px";
          box.style.marginTop = (paymentBox.offsetHeight / 4).toString() + "px";
          nameBlock.style.top = ((paymentBox.offsetHeight / 4) * 0.85).toString() + "px";
          cancelPayment.style.top = (paymentBox.offsetHeight * 0.7075).toString() + "px";
          validPayment.style.top = (paymentBox.offsetHeight * 0.7075).toString() + "px";
        } else {
          clearInterval(idInterval);
        }
      }
    }

    public cancelPayment() {
      let paymentBox = document.getElementById("confirm_payment");
      paymentBox.style.display = "none";
      let blackScreen = document.getElementById("confirm-black-screen");
      blackScreen.style.display = "none";
    }

    public boosterAppear() {
        //to delete
        //if (this.boosterCards.length === 0) {
        //  for (let i = 0; i < 6; i += 1) {
        //    this.boosterCards.push(this.getCard(1));
        //  }
        //}
        //----------------------------------------------
        let paymentBox = document.getElementById("confirm_payment");
        let boosterBlock = document.getElementById("booster");
        boosterBlock.classList.add("show");
        boosterBlock.style.opacity = "1";
        let boosterImg = document.getElementById("booster-img");
        boosterImg.style.top = paymentBox.style.top;
        boosterImg.style.left = paymentBox.style.left;
        boosterImg.style.width = paymentBox.style.width;
        this.cancelPayment();
        this.drawLine();
      }
    
      public drawLine() {
        let lineOpenBooster = document.getElementById("line_open_booster");
        let value = 0;
        let idInterval = setInterval(frame, 5, lineOpenBooster, this);
    
        function frame(lineOpenBooster: HTMLElement, func) {
          if (value < 53) {
            value += 1;
            lineOpenBooster.style.width = value.toString() + '%';
          } else {
            clearInterval(idInterval);
            func.boosterDesappear();
          }
        }
      }
    
      private boosterDesappear() {
        let boosterBlock = document.getElementById("booster");
        let value = 100;
        let idInterval = setInterval(frame, 10, boosterBlock, this);
    
        function frame(boosterBlock: HTMLElement, func) {
          if (value > 0) {
            value -= 1;
            boosterBlock.style.opacity = (value / 100).toString();
          } else {
            clearInterval(idInterval);
            boosterBlock.classList.remove("show");
            let lineOpenBooster = document.getElementById("line_open_booster");
            lineOpenBooster.style.width = '0%';
            func.cardsAppear();
          }
        }
      }
    
      private cardsAppear() {
        let cardsBlock = document.getElementById("cards_list");
        cardsBlock.classList.add("show");
        let buttonClose = document.getElementById("close-button-animation");
        buttonClose.style.display = "block";
        let value = 0;
        let idInterval = setInterval(frame, 10, cardsBlock, this);
    
        let cards0Block = document.getElementById("card_0");
        let cards1Block = document.getElementById("card_1");
        let cards2Block = document.getElementById("card_2");
        let cards3Block = document.getElementById("card_3");
        let cards4Block = document.getElementById("card_4");
        let cards5Block = document.getElementById("card_5");
        cards0Block.style.marginTop = (0.32 * window.innerHeight).toString() + "px";
        cards1Block.style.marginTop = (0.32 * window.innerHeight).toString() + "px";
        cards2Block.style.marginTop = (0.32 * window.innerHeight).toString() + "px";
        cards3Block.style.marginTop = (0.32 * window.innerHeight).toString() + "px";
        cards4Block.style.marginTop = (0.32 * window.innerHeight).toString() + "px";
        cards5Block.style.marginTop = (0.32 * window.innerHeight).toString() + "px";
    
        function frame(cardsBlock, func) {
          if (value <= 100) {
            value += 1;
            cardsBlock.style.opacity = (value / 100).toString();
          } else {
            clearInterval(idInterval);
            func.splitCards();
          }
        }
      }
    
      private splitCards() {
        let screenHeight = window.innerHeight;
        let header = document.getElementById("main_header");
        let headerHeight = header.offsetHeight;
        let closeButton = document.getElementById("close-button-animation");
        let closeButtonHeight = closeButton.offsetHeight;
        let cardHeight = (screenHeight - (headerHeight + closeButtonHeight)) / 3;
        let initPos = (0.32 * window.innerHeight);
    
        let cards0Block = document.getElementById("card_0");
        let cards1Block = document.getElementById("card_1");
        let cards2Block = document.getElementById("card_2");
        let cards3Block = document.getElementById("card_3");
        let cards4Block = document.getElementById("card_4");
        let cards5Block = document.getElementById("card_5");
    
        let value = 0;
        let idInterval = setInterval(frame, 10, cards0Block, cards1Block, cards2Block, cards3Block, cards4Block, cards5Block, cardHeight, headerHeight, initPos);
    
        function frame(cards0Block, cards1Block, cards2Block, cards3Block, cards4Block, cards5Block, cardHeight, headerHeight, initPos) {
          if (value < 100) {
            value += 1;
            cards0Block.style.width = (48 - (value * 0.18)).toString() + '%';
            cards1Block.style.width = (48 - (value * 0.18)).toString() + '%';
            cards2Block.style.width = (48 - (value * 0.18)).toString() + '%';
            cards3Block.style.width = (48 - (value * 0.18)).toString() + '%';
            cards4Block.style.width = (48 - (value * 0.18)).toString() + '%';
            cards5Block.style.width = (48 - (value * 0.18)).toString() + '%';
    
            //top cards
            let diff = initPos - headerHeight - 10;
            //card 0
            cards0Block.style.marginLeft = (26 - (value * 0.16)).toString() + '%';
            cards0Block.style.marginTop = (initPos - (value * (diff / 100))).toString() + "px";
    
            //card 1
            cards1Block.style.marginLeft = (26 + (value * 0.34)).toString() + '%';
            cards1Block.style.marginTop = (initPos - (value * (diff / 100))).toString() + "px";
    
            //middle cards
            diff = initPos - (headerHeight + cardHeight + 10);
            //card 2
            cards2Block.style.marginLeft = (26 - (value * 0.16)).toString() + '%';
            cards2Block.style.marginTop = (initPos - (value * (diff / 100))).toString() + "px";
    
            //card 3
            cards3Block.style.marginLeft = (26 + (value * 0.34)).toString() + '%';
            cards3Block.style.marginTop = (initPos - (value * (diff / 100))).toString() + "px";
    
            //bottom cards
            diff = initPos - (headerHeight + (cardHeight * 2) + 10);
            //card 4
            cards4Block.style.marginLeft = (26 - (value * 0.16)).toString() + '%';
            cards4Block.style.marginTop = (initPos - (value * (diff / 100))).toString() + "px";
    
            //card 5
            cards5Block.style.marginLeft = (26 + (value * 0.34)).toString() + '%';
            cards5Block.style.marginTop = (initPos - (value * (diff / 100))).toString() + "px";
          } else {
            clearInterval(idInterval);
          }
        }
      }
    
      public rotateCard(num: string) {
        let cardsBlock = document.getElementById("card_"+num);
        let value = 0;
        let idInterval = setInterval(frame, 10, cardsBlock);
    
        function frame(cardsBlock, func) {
          if (value < 100) {
            value += 1;
            if (value === 50) {
              cardsBlock.src = "http://ec2-13-59-89-177.us-east-2.compute.amazonaws.com:3000/articles/sprite2.png";
            }
            if (value >= 50) {
              cardsBlock.style.transform = 'rotateY(' + (180 - (value * 1.8)).toString() + 'deg)';
            }
            else {
              cardsBlock.style.transform = 'rotateY(' + (value * 1.8).toString() + 'deg)';
            }
          } else {
            clearInterval(idInterval);
          }
        }
      }
    
      public closeAnimation() {
        let cardsBlock = document.getElementById("cards_list");
        cardsBlock.classList.remove("show");
        let buttonClose = document.getElementById("close-button-animation");
        buttonClose.classList.remove("show");
    
        let cards0Block = document.getElementById("card_0") as HTMLImageElement;
        let cards1Block = document.getElementById("card_1") as HTMLImageElement;
        let cards2Block = document.getElementById("card_2") as HTMLImageElement;
        let cards3Block = document.getElementById("card_3") as HTMLImageElement;
        let cards4Block = document.getElementById("card_4") as HTMLImageElement;
        let cards5Block = document.getElementById("card_5") as HTMLImageElement;
    
        cards0Block.style.transform = null;
        cards0Block.style.marginLeft = null;
        cards0Block.style.marginTop = null;
        cards0Block.style.width = null;
        cards0Block.src = "assets/imgs/back.png";
    
        cards1Block.style.transform = null;
        cards1Block.style.marginLeft = null;
        cards1Block.style.marginTop = null;
        cards1Block.style.width = null;
        cards1Block.src = "assets/imgs/back.png";
    
        cards2Block.style.transform = null;
        cards2Block.style.marginLeft = null;
        cards2Block.style.marginTop = null;
        cards2Block.style.width = null;
        cards2Block.src = "assets/imgs/back.png";
    
        cards3Block.style.transform = null;
        cards3Block.style.marginLeft = null;
        cards3Block.style.marginTop = null;
        cards3Block.style.width = null;
        cards3Block.src = "assets/imgs/back.png";
    
        cards4Block.style.transform = null;
        cards4Block.style.marginLeft = null;
        cards4Block.style.marginTop = null;
        cards4Block.style.width = null;
        cards4Block.src = "assets/imgs/back.png";
    
        cards5Block.style.transform = null;
        cards5Block.style.marginLeft = null;
        cards5Block.style.marginTop = null;
        cards5Block.style.width = null;
        cards5Block.src = "assets/imgs/back.png";
      }
    
      public openBuyGold() {
        let buyGold = document.getElementById("buy_gold");
        buyGold.classList.add("show");
      }
    
      public closeBuyGold() {
        let buyGold = document.getElementById("buy_gold");
        buyGold.classList.remove("show");
      }
    
      public openError() {
        let buyGold = document.getElementById("error");
        buyGold.classList.add("show");
      }
    
      public closeError() {
        let buyGold = document.getElementById("error");
        buyGold.classList.remove("show");
      }
}