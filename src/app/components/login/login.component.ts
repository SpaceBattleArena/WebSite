import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
    moduleId: module.id,
    templateUrl: '../../templates/login.component.html',
    styleUrls: [ '../../../assets/css/login.component.css' ],
    selector: 'logister',
    providers: [UserService]
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService) { }

    ngOnInit() {
        
    }

    login() {
        this.loading = true;
        let user_json = JSON.stringify(this.model);
        
        this.userService.signin(user_json)
        .subscribe(
            resultArray => {
                this.loading = false;
                let current_user = {
                    token: resultArray["results"]["token"],
                    Email: resultArray["results"]["user"]["Email"],
                    ID: resultArray["results"]["user"]["Id"],
                    Name: resultArray["results"]["user"]["Name"],
                };
                localStorage.setItem('currentUser', JSON.stringify(current_user));
                this.router.navigate(['/profil']);
            },
            error => {
                this.loading = false;
                console.log("Error :: " + error);
                alert(error);
            }
        );
    }

    register() {
        this.loading = true;
        let user_json = JSON.stringify(this.model);
    
        this.userService.registration(user_json)
        .subscribe(
            resultArray => {
                alert(resultArray["message"]);
                this.loading = false;
                this.router.navigate(['']);
            },
            error => {
                this.loading = false;
                console.log("Error :: " + error);
                alert(error);
            }
        );
    }
}
