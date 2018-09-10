import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Error } from '../../models/error';

@Component({
  moduleId: module.id,
  selector: 'headerClient',
  styleUrls: [ '../../../assets/css/header.component.css' ],
  templateUrl: '../../templates/header.component.html'
})
export class HeaderComponent {
    currentUser: User;
    user: User[] = [];
    is_staff = false;
    private error: Error = null;

    constructor(private router: Router, private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser) {
            this.userService.getInformation(this.currentUser["token"])
                .subscribe(
                    resultArray => {
                        if (resultArray["results"] != undefined && resultArray["results"]["status"] != undefined && resultArray["results"]["status"] === 200) {
                            this.is_staff = resultArray["results"]["data"][0]["Is_staff"];
                        } else {
                            this.userService.logout();
                            this.currentUser = null;
                            this.router.navigate(['']);
                        }
                    },
                    error => {
                        this.error = new Error("Erreur", error, 3, true);
                    }
                )
        }
    }
}