import { Component, OnInit } from '@angular/core';

// import { Article } from '../../../_models/index';
// import { AlertService, ArticleService } from '../../../_services/index';

@Component({
  moduleId: module.id,
  selector: 'create-news',
  styleUrls: [ '../../../../assets/css/create_news.component.css' ],
  templateUrl: '../../../templates/create_news.component.html'
})
export class CreateNewsComponent {
  // allArticles: Article[];
  new_article: any = {};
  body_values: Array<string[]> = [];
  value: any[];

  constructor(/*private articleService: ArticleService*/) {
    // this.allArticles = JSON.parse(localStorage.getItem('articles'));
    // this.allArticles.forEach(article => {
    //   this.add_article_to_list(article);
    // });
  }

  public add_article() {
      // if (!this.new_article.title || !this.new_article.description || !this.new_article.image.url) {
      //   alert("Fill all inputs");
      //   return;
      // }
      // this.new_article.id = 0;
      // if (this.allArticles != null) {
      //   this.allArticles.forEach(element => {
      //     if (element.id == this.new_article.id) {
      //       this.new_article.id += 1;
      //     }
      //   });
      // }
      // this.new_article.slug = this.new_article.title.replace(" ", "-");
      // this.articleService.create(this.new_article)
      //   .subscribe(
      //     data => {
      //       alert('Creation success');
      //       //this.add_user_to_list(this.new_article);
      //       let news_list_block = document.getElementById('news-list');
      //       news_list_block.style.display = 'block';
      //       let create_news_block = document.getElementById('create-news');
      //       create_news_block.style.display = 'none';
      //     },
      //     error => {
      //       alert('Error while creation');
      //   });
  }

  public add_article_to_list(/*article: Article*/) {
    // this.value = [
    //   article.id.toString(), article.title, article.description,
    //   article.image
    // ];
    // this.body_values.push(this.value);
  }
}