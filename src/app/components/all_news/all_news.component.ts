import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var $: any;

import { Article } from '../../models/article';
import { ArticleService } from '../../services/news.service';

@Component({
    moduleId: module.id,
    styleUrls: [ '../../../assets/css/all-news.component.css' ],
    templateUrl: '../../templates/all_news.component.html',
    providers: [ArticleService]
})

export class AllNewsComponent implements OnInit {
    param: any;
    private sub: any;
    allArticles: Article[];
    tabNews: Array<Article[]> = [];
    displayTab: Array<Article> = [];
    sizePagination: Number = 0;

    constructor(private route: ActivatedRoute, private articleService: ArticleService) {
    }

    ngOnInit() {
        this.param = this.route.snapshot.queryParams['p'];
        if (this.param === undefined) {
            this.param = 1;
        }
        this.param = Number(this.param);
        this.articleService.getAll()
            .subscribe(
                resultArray => {
                    if (resultArray["results"]["status"] === 200) {
                        this.allArticles = resultArray["results"]["data"];
                        // for(let i = 0; this.allArticles.length > i; i += 1) {
                        //     this.allArticles[i].slug = this.allArticles[i].Title.toString().toLowerCase()
                        //         .replace(/\s+/g, '-')
                        //         .replace(/[^\w\-]+/g, '')
                        //         .replace(/\-\-+/g, '-')
                        //         .replace(/^-+/, '')
                        //         .replace(/-+$/, '');
                        // }
                        this.allArticles.reverse();
                        this.createTabNews();
                        this.displayTab = this.tabNews[this.param-1];
                        // let article_image = document.getElementById("news_item__img_0");
                        // console.log(article_image);
                        // article_image.style.backgroundImage = "url(http://localhost:3000/" + this.displayTab[0].Slug + ")";
                        // article_image = document.getElementById("news_item__img_1");
                        // article_image.style.backgroundImage = "url(http://localhost:3000/" + this.displayTab[1].Slug + ")";
                        // article_image = document.getElementById("news_item__img_2");
                        // article_image.style.backgroundImage = "url(http://localhost:3000/" + this.displayTab[2].Slug + ")";
                        // article_image = document.getElementById("news_item__img_3");
                        // article_image.style.backgroundImage = "url(http://localhost:3000/" + this.displayTab[3].Slug + ")";
                        // article_image = document.getElementById("news_item__img_4");
                        // article_image.style.backgroundImage = "url(http://localhost:3000/" + this.displayTab[4].Slug + ")";

                        // let article_image: HTMLElement;
                        // for (let i = 0; i < this.displayTab.length; i += 1) {
                        //     // article_image = document.getElementById("news_item__img_"+i.toString());
                        //     // article_image.style.backgroundImage = "url(http://localhost:3000/" + this.displayTab[i].Slug + ")";
                        //     $("#news_item__img_"+i.toString()).css("background-image", "url(http://localhost:3000/" + this.displayTab[i].Slug + ")");
                        // }
                    }
                }
            );
    }

    private createTabNews() {
        let addTab: Array<Article> = [];
        for (let i = 0; i < Math.ceil(this.allArticles.length/5); i+=1) {
            for (let j = 0; j < 5; j+=1) {
                if ((5*i)+j < this.allArticles.length) {
                    addTab.push(this.allArticles[(5*i)+j]);
                }
            }
            this.tabNews[i] = (addTab);
            addTab = [];
        }
        this.sizePagination = this.tabNews.length;
    }

    public fillImage(idElement:string) {
        let article_image = document.getElementById("news_item__img_"+idElement);
        article_image.style.backgroundImage = "url(http://localhost:3000/" + this.displayTab[Number(idElement)].Slug + ")";
    }
}
