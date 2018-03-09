import { Component, OnInit, ViewChild } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { Chart } from 'chart.js';

import { User } from '../../../models/user';
import { Article } from '../../../models/article';
import { Discussion } from '../../../models/discussion';
import { Message } from '../../../models/message';
import { UserService } from '../../../services/user.service';
import { ArticleService } from '../../../services/news.service';
import { ForumService } from '../../../services/forum.service';

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  styleUrls: [ '../../../../assets/css/dashboard.component.css' ],
  templateUrl: '../../../templates/dashboard.component.html',
  providers: [UserService, ArticleService, ForumService]
})
export class DashboardComponent implements OnInit {
  allArticles: Article[];
  allUsers: User[];
  allDiscussions: Discussion[];
  allMessages: Message[];
  count_articles: number;
  count_user: number;
  loading = true;
  rank_chart : any;
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  count_news = 0;

  public RankLabels:string[] = ['Roo', '2nd', '1st', 'Cap', 'Maj', 'LtC', 'Col', 'MjG', 'LtG', 'Gen', 'GoA'];
  public RankData:number[] = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  public RankType:string = 'doughnut';
 
  rank_labels = ['Roo', '2nd', '1st', 'Cap', 'Maj', 'LtC', 'Col', 'MjG', 'LtG', 'Gen', 'GoA'];
  rank_datas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  public ArenaLabels:string[] = ['Ar 1', 'Ar 2', 'Ar 3', 'Ar 4', 'Ar 5', 'Ar 6', 'Ar 7', 'Ar 8'];
  public ArenaData:number[] = [1, 0, 0, 0, 0, 0, 0, 0];
  public ArenaType:string = 'doughnut';
 
  arena_labels = ['Ar 1', 'Ar 2', 'Ar 3', 'Ar 4', 'Ar 5', 'Ar 6', 'Ar 7', 'Ar 8'];
  arena_datas = [0, 0, 0, 0, 0, 0, 0, 0];

  public CreatedOptions:any = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(255,255,255,1)'
        },
        ticks: {
          fontColor: 'rgba(255,255,255,1)',
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(255,255,255,1)',
        },
        ticks: {
          fontColor: 'rgba(255,255,255,1)'
        }
      }],
      scaleLabel: [{
        fontColor: 'rgba(255,255,255,1)'
      }]
    }
  };
  public CreatedLabels:string[] = ['Nov 17', 'Dec 17', 'Jan 18', 'Feb 18', 'Mar 18', 'Avr 18'];
  public CreatedData:any[] = [
    {data: [9, 0, 0, 0, 0, 0], label: 'Number Players Created'}
  ];
  public CreatedType:string = 'bar';
 
  created_labels = [
      {data: [9, 0, 0, 0, 0, 0], label: 'Number Players Created'}
  ];
  created_datas = [9, 0, 0, 0, 0, 0];

  public NewsLabels:string[] = ['Nov 17', 'Dec 17', 'Jan 18', 'Feb 18', 'Mar 18', 'Avr 18'];
  public NewsData:any[] = [
    {data: [9, 0, 0, 0, 0, 0], label: 'Posted News'}
  ];
  public NewsType:string = 'bar';
 
  news_labels = [
      {data: [9, 0, 0, 0, 0, 0], label: 'Number Players Created'}
  ];
  news_datas = [9, 0, 0, 0, 0, 0];

  public DiscussionsLabels:string[] = ['Nov 17', 'Dec 17', 'Jan 18', 'Feb 18', 'Mar 18', 'Avr 18'];
  public DiscussionsData:any[] = [
    {data: [9, 0, 0, 0, 0, 0], label: 'Discussions'}
  ];
  public DiscussionsType:string = 'bar';
 
  discussions_labels = [
      {data: [9, 0, 0, 0, 0, 0], label: 'Number Players Created'}
  ];
  discussions_datas = [9, 0, 0, 0, 0, 0];

  public MessagesLabels:string[] = ['Ar 1', 'Ar 2', 'Ar 3', 'Ar 4', 'Ar 5', 'Ar 6', 'Ar 7', 'Ar 8'];
  public MessagesData:number[] = [1, 0, 0, 0, 0, 0, 0, 0];
  public MessagesType:string = 'doughnut';
 
  messages_labels = ['Ar 1', 'Ar 2', 'Ar 3', 'Ar 4', 'Ar 5', 'Ar 6', 'Ar 7', 'Ar 8'];
  messages_datas = [1, 0, 0, 0, 0, 0, 0, 0];

  count_discussions = 0;
  count_messages = 0;

  ranks_names: any = [
    ['Rookie', 0],
    ['2nd Lieutenant', 100],
    ['1st Lieutenant', 200],
    ['Captain', 300],
    ['Major', 400],
    ['Lieutenant Colonel', 500],
    ['Colonel', 600],
    ['Brigadier General', 700],
    ['Major General', 800],
    ['Lieutenant-General', 900],
    ['General', 1000],
    ['General of the Army', 1100],
  ];
  arena_names: any =  [
      ['Arena 1', 0],
      ['Arena 2', 1],
      ['Arena 3', 2],
      ['Arena 4', 3],
      ['Arena 5', 4],
      ['Arena 6', 5],
      ['Arena 7', 6],
      ['Arena 8', 7],
  ];

  constructor(private articleService: ArticleService, private userService: UserService, private forumService: ForumService) {
  }

  ngOnInit() {
    this.articleService.getAll()
      .subscribe(
        resultArray => {
          this.allArticles = resultArray["results"]["data"];
          this.count_articles = this.allArticles.length;
          this.userService.getAll()
            .subscribe(
              resultArray => {
                this.allUsers = resultArray["results"]["data"];
                this.count_user = this.allUsers.length;
                this.count_rank_player();
                this.count_arena();
                this.loading = false;
              }
            );
          this.posted_news();
          this.count_news = this.allArticles.length;
        }
      );
    this.allDiscussions = this.forumService.getAllDiscussions();
    this.allMessages = this.forumService.getAllMessages();
    this.latest_messages();
    this.created_discussions();
  }

  count_rank_player() {
    let index: number = 0;
    for (let i = 0; i < this.allUsers.length; i += 1) {
      index = 0;
      while(index < this.ranks_names.length) {
          if (index + 1 < this.ranks_names.length) {
              if (this.allUsers[i].Rank_id >= this.ranks_names[index][1] && this.allUsers[i].Rank_id < this.ranks_names[index+1][1]) {
                  this.rank_datas[index] += 1;

              }
          } else {
              if (this.allUsers[i].Rank_id >= this.ranks_names[index][1]){
                  this.rank_datas[index] += 1;
              }
          }
          index += 1;
      }
    }
    this.RankData = this.rank_datas;
  }

  count_arena() {
    let index: number = 0;
    this.allUsers.forEach(user => {
        index = 0;
        while(index < this.arena_names.length) {
            if (user.Arena_id == this.arena_names[index][1]) {
                this.arena_datas[index] += 1;
            }
            index += 1;
        }
    });
    this.ArenaData = this.arena_datas;
  }

  created_players() {

  }

  posted_news() {
    let date: any;
    this.NewsLabels = [];
    this.NewsData[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let current_date = new Date();
    for (let i = 0; i < this.months.length; i += 1) {
      this.NewsLabels.push(this.months[i] + " " + current_date.getFullYear());
      this.NewsData[0].data.push(0);
    }
    for (let i = 0; i < this.allArticles.length; i += 1) {
      date = new Date(this.allArticles[i]["CreateDate"].toString())
      for (let j = 0; j < this.NewsLabels.length; j += 1) {
        if (this.months[date.getMonth()] + " " + date.getFullYear() == this.NewsLabels[j]) {
          this.NewsData[0].data[j] += 1;
        }
      }
    }
  }

  latest_messages() {
    this.messages_labels = [];
    this.messages_datas = [0, 0, 0, 0, 0];
    let latest_discussions = this.allDiscussions.reverse();

    for (let i = 0; i < 5; i += 1) {
      this.messages_labels[i] = latest_discussions[i]['title'];
    }
    for (let j = 0; j < this.allMessages.length; j += 1) {
      this.count_messages += 1;
      for (let i = 0; i < 5; i += 1) {
        if (latest_discussions[i]['id'] == this.allMessages[j]['discussion_id']) {
          this.messages_datas[i] += 1;
        }
      }
    }
    this.MessagesData = this.messages_datas;
    this.MessagesLabels = this.messages_labels;
    this.count_discussions = this.allDiscussions.length;
  }

  created_discussions() {
    let date: any;
    this.DiscussionsLabels = [];
    this.DiscussionsData[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let current_date = new Date();
    for (let i = 0; i < this.months.length; i += 1) {
      this.DiscussionsLabels.push(this.months[i] + " " + current_date.getFullYear());
      this.DiscussionsData[0].data.push(0);
    }
    for (let i = 0; i < this.allDiscussions.length; i += 1) {
      date = new Date(this.allDiscussions[i]["created"].toString())
      for (let j = 0; j < this.DiscussionsLabels.length; j += 1) {
        if (this.months[date.getMonth()] + " " + date.getFullYear() == this.DiscussionsLabels[j]) {
          this.DiscussionsData[0].data[j] += 1;
        }
      }
    }
  }

  
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}