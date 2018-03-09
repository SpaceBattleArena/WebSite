import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Article } from '../../models/article';
import { ArticleService } from '../../services/news.service';

@Component({
    moduleId: module.id,
    styleUrls: [ '../../../assets/css/news.component.css' ],
    templateUrl: '../../templates/news.component.html',
    providers: [ArticleService]
})

export class NewsComponent implements OnInit, OnDestroy {
    slug: string;
    private sub: any;
    article: Article = new Article();

    constructor(private route: ActivatedRoute, private articleService: ArticleService) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.slug = params['slug'];
        });
        this.articleService.getById(Number(this.slug))
            .subscribe(
                resultArray => {
                    this.article = resultArray['results']['data'][0];
                },
                error => {
                    console.log(error);
                }
            )
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    @HostListener("window:scroll", [])
    on_scroll() {
        console.log('t');
        let scroll = document.documentElement.scrollTop;
        document.getElementById("image-article").style.transform = "translateY(-" + (scroll/5) + "px)";
    }
}