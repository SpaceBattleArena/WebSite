import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../models/user';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/news.service';
import { Error } from '../../models/error';
declare var $: any;

@Component({
    moduleId: module.id,
    styleUrls: [ '../../../assets/css/home.component.css' ],
    templateUrl: '../../templates/home.component.html',
    providers: [ArticleService]
})

export class HomeComponent implements OnInit {
    private sub: any;
    private currentUser: User;
    allArticles: Article[];
    ArticlesLimit: any = [];
    translateXShip = 0;
    translateYShip = 0;
    rotateShip = 0;
    pos_screens = 30;
    private error: Error = null;

    constructor(
        private articleService: ArticleService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    sleep(milliseconds: Number) {
        let start = new Date().getTime();
        for (let i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }

    public display_home() {
        let value = 0;
        let id = setInterval(frame, 8);
        let mask_top = document.getElementById('mask_top');
        let mask_bottom = document.getElementById('mask_bottom');
        let explore = document.getElementById('explore');
        let spaceship = document.getElementById('spaceship');
        mask_top.style.opacity = '1';
        mask_bottom.style.opacity = '1';
        explore.style.opacity = '1';

        function frame() {
            if (value == 100) {
                clearInterval(id);
                mask_top.style.opacity = '0';
                mask_bottom.style.opacity = '0';
            } else {
                value++;
                mask_top.style.transform = "translateX(" + value * 1.1 + "%)";
                mask_bottom.style.transform = "translateX(" + value * 1.4 + "%)";
                spaceship.style.opacity = (value / 100).toString();
            }
        }
    }

    when_loading() {
        let value = 0;
        let id = setInterval(frame, 8, this);
        let girl = document.getElementById('girl');
        let window_elem = document.getElementById('window');
        let loading_bar = document.getElementById('loading-bar');
        let main = document.getElementById('main');
        let sc_heading = document.getElementById('sc_heading');
        let nav = document.getElementById('nav');
        let moon = document.getElementById('the-moon-below');
        let moon_mobile = document.getElementById('the-moon-below-mobile');
        let ship = document.getElementById("spaceship");
        let loading_section = document.getElementById("loading_section");
        nav.style.opacity = "0";

        function frame(func:any) {
            if (value == 100) {
                clearInterval(id);
                girl.style.opacity = "0";
                window_elem.style.opacity = "0";
                loading_section.style.display = "none";
                loading_bar.style.opacity = "0";
                main.style.opacity = "1";
                sc_heading.style.opacity = "1";
                ship.style.opacity = "1";
                func.display_home();
            } else {
                value++;
                girl.style.transform = "translateX(" + value / 3 + "vw)";
                window_elem.style.transform = "translateX(" + value / 4 + "vw) scaleX(" + value * 0.045 + ") scaleY(" + value * 0.045 + ")";
                loading_bar.style.transform = "scaleX(" + value / 100 + ")";
                moon.style.transform = "translateX(" + ((value / 2) - 50) + "vw)";
                moon_mobile.style.transform = "translateX(" + ((value / 2) - 50) + "vw)";
                nav.style.opacity = (value / 100).toString();
            }
        }
    }

    move_ship(e: MouseEvent) {
        let ship = document.getElementById("spaceship");
        let ship_size_x = ship.offsetWidth;
        let ship_size_y = ship.offsetHeight;
        let x = e.clientX;
        let y = e.clientY;
        let window_x = window.innerWidth;
        let window_y = window.innerHeight;
        let pos_ship_x = ship.offsetLeft;
        let document_height = document.body.clientHeight;
        let pos_ship_y = document_height * 0.1;

        if (x > pos_ship_x + (ship_size_x / 2)) {
            if (this.translateXShip > -15) {
                this.translateXShip -= 0.1;
            }
            if (this.rotateShip > -3) {
                this.rotateShip -= 0.05;
            }
        } else {
            if (this.translateXShip < 15) {
                this.translateXShip += 0.1;
            }
            if (this.rotateShip < 3) {
                this.rotateShip += 0.05;
            }
        }

        let pos_invert = ((((pos_ship_y + (ship_size_y / 2)) * 100) / document_height) / 100) * window_y;

        if (y > pos_invert) {
            if (this.translateYShip > -15) {
                this.translateYShip -= 0.1;
            }
        } else {
            if (this.translateYShip < 15) {
                this.translateYShip += 0.1;
            }
        }
        ship.style.transform = "translateX(" + this.translateXShip + "px) translateY(" + this.translateYShip + "px) rotateZ(" + this.rotateShip + "deg)";
        document.getElementById('the-moon-below').style.transform = "rotateZ(" + (this.rotateShip * (-1)) + "deg)";
        document.getElementById('the-moon-below-mobile').style.transform = "rotateZ(" + (this.rotateShip * (-1)) + "deg)";
    }

    // @HostListener("window:scroll", [])
    // on_scroll() {
    //     let screens = document.getElementById('screens');
    //     let screensPosX = screens.offsetTop - screens.scrollTop + screens.clientTop;
    //     let scroll = document.documentElement.scrollTop;
    //     console.log('screens.offsetTop : ' + screens.offsetTop);
    //     console.log('screens.scrollTop : ' + screens.scrollTop);
    //     console.log('screens.clientTop : ' + screens.clientTop);
    //     console.log('scroll : ' + scroll);
    //     console.log('calc : ' + (screensPosX + (document.body.clientHeight * 0.1)));
    //     if (scroll > screensPosX + (document.body.clientHeight * 0.1)) {
    //         if (this.pos_screens > 0) {
    //             this.pos_screens -= 1;
    //             document.getElementById("screens-1").style.transform = "translateX(" + this.pos_screens + "vw)";
    //             document.getElementById("screens-2").style.transform = "translateX(" + this.pos_screens + "vw)";
    //         }
    //     }
    // }

    @HostListener("window:scroll", [])
    on_scroll() {
        let scroll = document.documentElement.scrollTop;
        document.getElementById("vr_heading").style.transform = "translateX(" + (scroll/100) + "vw)";
        document.getElementById("card_heading").style.transform = "translateX(" + (scroll/100) + "vw)";
        document.getElementById("esport_heading").style.transform = "translateX(" + (scroll/100) + "vw)";
        document.getElementById("war_heading").style.transform = "translateX(" + (scroll/100) + "vw)";
        
        let article_image = document.getElementById("article_image_0");
        article_image.style.backgroundImage = "url(http://ec2-13-59-89-177.us-east-2.compute.amazonaws.com:3000/" + this.ArticlesLimit[0].Slug + ")";
        article_image = document.getElementById("article_image_1");
        article_image.style.backgroundImage = "url(http://ec2-13-59-89-177.us-east-2.compute.amazonaws.com:3000/" + this.ArticlesLimit[1].Slug + ")";
        article_image = document.getElementById("article_image_2");
        article_image.style.backgroundImage = "url(http://ec2-13-59-89-177.us-east-2.compute.amazonaws.com:3000/" + this.ArticlesLimit[2].Slug + ")";
        article_image = document.getElementById("article_image_3");
        article_image.style.backgroundImage = "url(http://ec2-13-59-89-177.us-east-2.compute.amazonaws.com:3000/" + this.ArticlesLimit[3].Slug + ")";
    }

    vr_click() {
        $('#vr').addClass("w--tab-active");
        $('#card').removeClass("w--tab-active");
        $('#e-sport').removeClass("w--tab-active");
        $('#war').removeClass("w--tab-active");
    }

    card_click() {
        $('#vr').addClass("w--tab-active");
        $('#card').removeClass("w--tab-active");
        $('#e-sport').removeClass("w--tab-active");
        $('#war').removeClass("w--tab-active");
    }

    war_click() {
        $('#vr').addClass("w--tab-active");
        $('#card').removeClass("w--tab-active");
        $('#e-sport').removeClass("w--tab-active");
        $('#war').removeClass("w--tab-active");
    }

    esport_click() {
        $('#vr').addClass("w--tab-active");
        $('#card').removeClass("w--tab-active");
        $('#e-sport').removeClass("w--tab-active");
        $('#war').removeClass("w--tab-active");
    }

    ngOnInit() {
        $('body').removeClass("fixed-sn black-skin");
        $('body').css('background-image', "url('../../assets/img/SPACE.jpg')");
        $('body').css('background-color', 'none');
        this.when_loading();
        this.sleep(1500);
        this.articleService.getAll()
            .subscribe(
                resultArray => {
                    if (resultArray["results"]["status"] === 200) {
                        this.allArticles = resultArray["results"]["data"];
                        let count = this.allArticles.length;
                        if (count >= 4) {
                            this.ArticlesLimit = [this.allArticles[count-1], this.allArticles[count-2], this.allArticles[count-3], this.allArticles[count-4]]
                        } else {
                            this.ArticlesLimit = this.allArticles;
                        }
                        for(let i = 0; this.ArticlesLimit.length > i; i += 1) {
                            this.ArticlesLimit[i].slug = this.ArticlesLimit[i].Title.toString().toLowerCase()
                                .replace(/\s+/g, '-')
                                .replace(/[^\w\-]+/g, '')
                                .replace(/\-\-+/g, '-')
                                .replace(/^-+/, '')
                                .replace(/-+$/, '');
                        }
                        // this.sleep(1500);
                        // this.when_loading();
                    }
                },
                error => {
                    this.error = new Error("Erreur", error, 3, true);
                }
            );
        
        this.sub = this.route
        .queryParams
        .subscribe(params => {
            if (params.state != undefined) {
                if (params.state === "no log") {
                    let loginBlock = document.getElementById("login");
                    let registerBlock = document.getElementById("signup");
                    let forgotPasswordBlock = document.getElementById("forgot_password");
                    let loginLink = document.getElementById("login_link");
                    let registerLink = document.getElementById("register_link");
                    let logisterBlock = document.getElementById("logister");
                    let logisterCloseBlock = document.getElementById("logister_close");

                    loginBlock.style.display = "block";
                    registerBlock.style.display = "none";
                    forgotPasswordBlock.style.display = "none";
                    loginLink.classList.add("active");
                    registerLink.classList.remove("active");
                    logisterBlock.classList.add("show");
                    logisterCloseBlock.classList.add("show");
                }
            }
        },
    error => {
        this.error = new Error("Erreur", error, 3, true);
    });
    }
}