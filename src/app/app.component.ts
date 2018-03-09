import { Component, OnInit } from "@angular/core";
import { UserService } from "./services/user.service";
import { User } from "./models/user";
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/css/app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit {
  _postsArray: User[];
 
  constructor(private apiSerivce: UserService) {
  }
 
  ngOnInit(): void {
  }
}