import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Article } from '../../../models/article';
import { ArticleService } from '../../../services/news.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
declare var $: any;

@Component({
  moduleId: module.id,
  styleUrls: [ '../../../../assets/css/items.component.css' ],
  templateUrl: '../../../templates/items.component.html',
  providers: [ArticleService, UserService]
})
export class ItemsComponent implements OnInit {
  /*Global variables*/
  headValues: string[] = [];
  bodyValues: Array<string[]> = [];
  value: any[];
  slug: string;
  private sub: any;
  alertModalTitle: string = '';
  alertModalDescription: string = '';
  idToDelete: number;

  /*Variables for News*/
  allArticles: Article[];
  new_article: Article = new Article();

  /*Variables for Players*/
  allUsers: User[];
  new_user: any = {};

  constructor(private route: ActivatedRoute, private articleService: ArticleService, private userService: UserService) {
    console.log(this.slug);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
        this.slug = params['slug'];
    });
    console.log(this.slug);
    if (this.slug === 'news') {
      this.headValues = ['ID', 'Title', 'Description', 'Image', 'Slug'];
      this.get_all_articles();
    } else if (this.slug === 'players') {
      this.headValues = ['ID', 'Username', 'Email', 'Password', 'Rank_id',
        'Arena_id', 'Avatar_id', 'Player_id', 'Is_staff',
        'Is_activate'];
        this.get_all_users();
    }
  }

  public addItem() {
    if (this.slug === 'news') {
      this.add_article();
    } else if(this.slug === 'players') {
      this.add_user();
    }
  }

  toggleAdding() {
    $('#add-new-item').toggleClass('show');
    $('#add-new-item-screen').toggleClass('show');
  }

  public modify(index:number) {
    this.toggleAdding();
    if (this.slug === 'news') {
      this.new_article.ID = Number(this.bodyValues[index][0]);
      this.new_article.Title = this.bodyValues[index][1];
      this.new_article.Description = new Text(this.bodyValues[index][2]);
      this.new_article.Image = this.bodyValues[index][3];
      $('#title_label').css('transform', 'translateY(-33px)');
      $('#title_label').css('color', 'rgb(0, 98, 204)');
      $('#title_label').css('font-size', '13px');
      $('#description_label').css('transform', 'translateY(-33px)');
      $('#description_label').css('color', 'rgb(0, 98, 204)');
      $('#description_label').css('font-size', '13px');
      $('#slug_label').css('transform', 'translateY(-33px)');
      $('#slug_label').css('color', 'rgb(0, 98, 204)');
      $('#slug_label').css('font-size', '13px');
    } else if (this.slug === 'players') {
      this.new_user.ID = Number(this.bodyValues[index][0]);
      this.new_user.Username = this.bodyValues[index][1];
      this.new_user.Email = this.bodyValues[index][2];
      this.new_user.Password = this.bodyValues[index][3];
      this.new_user.Rank_id = Number(this.bodyValues[index][4]);
      this.new_user.Arena_id = Number(this.bodyValues[index][5]);
      this.new_user.Avatar_id = Number(this.bodyValues[index][6]);
      this.new_user.Player_id = Number(this.bodyValues[index][7]);
      this.new_user.Is_staff = Boolean(this.bodyValues[index][8]);
      this.new_user.Is_activate = Boolean(this.bodyValues[index][9]);
      $('#username_label').css('transform', 'translateY(-33px)');
      $('#username_label').css('color', 'rgb(0, 98, 204)');
      $('#username_label').css('font-size', '13px');
      $('#password_label').css('transform', 'translateY(-33px)');
      $('#password_label').css('color', 'rgb(0, 98, 204)');
      $('#password_label').css('font-size', '13px');
      $('#email_label').css('transform', 'translateY(-33px)');
      $('#email_label').css('color', 'rgb(0, 98, 204)');
      $('#email_label').css('font-size', '13px');
    }
  }

  public cancelAdding() {
    if (this.slug === 'news') {
      this.new_article = new Article();
      $('#title_label').css('transform', 'none');
      $('#title_label').css('color', '#757575');
      $('#title_label').css('font-size', '17px');
      $('#description_label').css('transform', 'none');
      $('#description_label').css('color', '#757575');
      $('#description_label').css('font-size', '17px');
      $('#slug_label').css('transform', 'none');
      $('#slug_label').css('color', '#757575');
      $('#slug_label').css('font-size', '17px');
    } else if (this.slug === 'players') {
      this.new_user = {};
      $('#username_label').css('transform', 'none');
      $('#username_label').css('color', '#757575');
      $('#username_label').css('font-size', '17px');
      $('#password_label').css('transform', 'none');
      $('#password_label').css('color', '#757575');
      $('#password_label').css('font-size', '17px');
      $('#email_label').css('transform', 'none');
      $('#email_label').css('color', '#757575');
      $('#email_label').css('font-size', '17px');
    }
    this.toggleAdding();
  }

  public alert_delete(id:number) {
    if (this.slug === 'news') {
      this.alertModalDescription = 'You are going to delete this article (ID : '+id+'), you will not be able to go back. Do you want to continue ?';
    }
    this.alertModalTitle = 'Warning';
    this.idToDelete = id;
    $('#centralModalSm').css('display', 'block');
  }

  public delete(id:number) {
    $('#centralModalSm').css('display', 'none');
    if (this.slug === 'news') {
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
    } else if (this.slug === 'players') {
      this.userService.delete(id)
      .subscribe(
        data => {
            alert('User deleted');
            this.get_all_users();
        },
        error => {
            alert('Error while deleting');
        }
      );
    }
  }

  public cancel() {
    this.alertModalDescription = '';
    this.alertModalTitle = '';
    this.idToDelete = null;
    $('#centralModalSm').css('display', 'none');
  }

  public fileChange(event) {
    let fileList: FileList = event.target.files;
    this.new_article.Slug = fileList[0];
    console.log(this.new_article.Slug);
  }

  /*Functions for News*/
  private get_all_articles() {
    this.bodyValues = [];
    this.articleService.getAll()
      .subscribe(
        resultArray => {
          this.allArticles = resultArray["results"]["data"];
          // for (let i = 0; i < this.allArticles.length; i += 1) {
          //   this.allArticles[i].slug = this.allArticles[i]["Title"];
          //   this.allArticles[i].slug = this.allArticles[i].slug.toString().toLowerCase()
          //         .replace(/\s+/g, '-')
          //         .replace(/[^\w\-]+/g, '')
          //         .replace(/\-\-+/g, '-')
          //         .replace(/^-+/, '')
          //         .replace(/-+$/, '');
          // }
          this.allArticles.forEach(article => {
            this.add_article_to_list(article);
          });
        },
        error => {
          console.log(error);
        }
      );
  }

  public add_article_to_list(article: Article) {
    this.value = [
      article.ID, article.Title, article.Description,
      article.Image, "http://localhost:3000/"+article.Slug
    ];
    this.bodyValues.push(this.value);
  }

  public add_article() {
      this.new_article.Image = "../../assets/img/example-news.png";

      if (!this.new_article.Title || !this.new_article.Description || !this.new_article.Slug) {
        alert("Fill all inputs");
        return;
      }
      if (this.new_article.ID == undefined || this.new_article.ID == null) {
        this.articleService.create(this.new_article)
        .subscribe(
          data => {
            console.log(data);
            alert('Creation success');
            this.get_all_articles();
            this.toggleAdding();
            this.new_article = new Article();
          },
          error => {
            alert('Error while creation');
        });
      } else {
        this.articleService.update(this.new_article)
          .subscribe(
              resultArray => {
                this.new_article = new Article();
                this.get_all_articles();
                this.toggleAdding();
                alert("update successfull");
              },
              error => {
                console.log(error);
              }
          );
      }
  }

  /*Functions for Players*/
  private get_all_users() {
    this.bodyValues = [];
    this.userService.getAll()
      .subscribe(
          resultArray => {
            this.allUsers = resultArray["results"]["data"];
            this.allUsers.forEach(user => {
                this.add_user_to_list(user);
            });
          },
          error => {
              console.log(error);
          }
      );
  }

  add_user_to_list(user_to_add:User) {
    this.value = [
        user_to_add.ID, user_to_add.Name, user_to_add.Email,
        user_to_add.Password, user_to_add.Rank_id, user_to_add.Arena_id,
        user_to_add.Avatar_id, user_to_add.Player_id,
        user_to_add.Is_staff, user_to_add.Is_activate
    ];
    this.bodyValues.push(this.value);
  }

  add_user() {
    if (!this.new_user.Username || !this.new_user.Email || !this.new_user.Password) {
      alert("Fill all inputs");
      return;
    }
    if (this.new_user.Rank_id == undefined || this.new_user.Rank_id == null) {
      this.new_user.Rank_id = 1;
    }
    if (this.new_user.Arena_id == undefined || this.new_user.Arena_id == null) {
      this.new_user.Arena_id = 1;
    }
    if (this.new_user.Avatar_id == undefined || this.new_user.Avatar_id == null) {
      this.new_user.Avatar_id = 1;
    }
    if (this.new_user.Player_id == undefined || this.new_user.Player_id == null) {
      this.new_user.Player_id = 1;
    }
    if (this.new_user.Is_staff == undefined || this.new_user.Is_staff == null) {
      this.new_user.Is_staff = false;
    }
    if (this.new_user.Is_activate == undefined || this.new_user.Is_activate == null) {
      this.new_user.Is_activate = false;
    }
    if (this.new_user.ID == undefined || this.new_user.ID == null) {
      // this.articleService.create(JSON.stringify(this.new_user))
      // .subscribe(
      //   data => {
      //     console.log(data);
      //     alert('Creation success');
      //     this.get_all_articles();
      //     this.toggleAdding();
      //     this.new_user = new Article();
      //   },
      //   error => {
      //     alert('Error while creation');
      // });
      this.toggleAdding();
      alert("Creation is down for the moment");
    } else {
      console.log(this.new_user);
      // this.userService.update(this.new_user)
      //   .subscribe(
      //       resultArray => {
      //         this.new_user = {};
      //         this.get_all_articles();
      //         this.toggleAdding();
      //         alert("update successfull");
      //       },
      //       error => {
      //         console.log(error);
      //       }
      //   );
    }
  }
}