import { Component, OnInit } from '@angular/core';

import { Article } from '../../../models/article';
import { ArticleService } from '../../../services/news.service';

@Component({
  moduleId: module.id,
  selector: 'news-list',
  styleUrls: [ '../../../../assets/css/news-list.component.css' ],
  templateUrl: '../../../templates/news-list.component.html',
  providers: [ArticleService]
})
export class NewsListComponent implements OnInit {
  allArticles: Article[];
  new_article: Article = new Article();
  head_values: string[] = [
      'id', 'title', 'description', 'image', 'slug'
  ];
  body_values: Array<string[]> = [];
  value: any[];

  constructor(private articleService: ArticleService) {
  }

  public add_article_to_list(article: Article) {
    this.value = [
      article.ID, article.Title, article.Description,
      article.Image, article.slug
    ];
    this.body_values.push(this.value);
  }

  public add_article() {
      this.new_article.Image = "../../assets/img/example-news.png";
      if (!this.new_article.Title || !this.new_article.Description || !this.new_article.Image) {
        alert("Fill all inputs");
        return;
      }
      if (this.new_article.ID != undefined || this.new_article.ID != null) {
        this.articleService.create(JSON.stringify(this.new_article))
        .subscribe(
          data => {
            alert('Creation success');
            this.get_all_articles();
            let news_list_block = document.getElementById('create-news_id');
            news_list_block.style.display = 'none';
            this.new_article = new Article();
          },
          error => {
            alert('Error while creation');
        });
      } else {
        this.articleService.update(this.new_article)
          .subscribe(
              resultArray => {
                  this.get_all_articles();
                  alert("update successfull");
              },
              error => {
                  console.log(error);
              }
          );
      }
  }

  public toggle_add_news() {
    let create_news_block = document.getElementById("create-news_id");
    if (create_news_block.style.display == "none") {
      create_news_block.style.display = "block";
    } else {
      create_news_block.style.display = "none";
    }
  }

  public modify(values:string[], index:number) {
    this.new_article.ID = Number(values[0]);
    this.new_article.Title = values[1];
    this.new_article.Description = new Text(values[2]);
    this.new_article.Image = values[3];

    let news_list_block = document.getElementById('create-news_id');
    news_list_block.style.display = 'block';
  }

  public delete(id:number) {
    this.articleService.delete(id)
      .subscribe(
        data => {
            alert('Article deleted');
            this.get_all_articles();
        },
        error => {
            alert('Error while deleting');
        }
      );
  }

  private get_all_articles() {
    this.body_values = [];
    this.articleService.getAll()
      .subscribe(
        resultArray => {
          this.allArticles = resultArray["results"]["data"];
          for (let i = 0; i < this.allArticles.length; i += 1) {
            this.allArticles[i].slug = this.allArticles[i]["Title"];
            this.allArticles[i].slug = this.allArticles[i].slug.toString().toLowerCase()
                  .replace(/\s+/g, '-')
                  .replace(/[^\w\-]+/g, '')
                  .replace(/\-\-+/g, '-')
                  .replace(/^-+/, '')
                  .replace(/-+$/, '');
          }
          this.allArticles.forEach(article => {
            this.add_article_to_list(article);
          });
        },
        error => {
          console.log(error);
        }
      );
  }

  ngOnInit() {
    this.get_all_articles();
  }


}