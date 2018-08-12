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
    public newEmail: string = "";

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService) { }

    ngOnInit() {
        this.displayRegister();
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

    public forgotPassword() {
        //console.log(this.newEmail);
        this.userService.forgotPassword(this.newEmail)
        .subscribe(
            resultArray => {
                console.log(resultArray);
                if (resultArray["results"]["status"] === 200) {
                    alert("Un mail vous à été envoyé");
                }
            }
        );
    }

    public displayForgotPassword() {
        let loginBlock = document.getElementById("login");
        let registerBlock = document.getElementById("signup");
        let forgotPasswordBlock = document.getElementById("forgot_password");

        loginBlock.style.display = "none";
        registerBlock.style.display = "none";
        forgotPasswordBlock.style.display = "block";
    }

    public displayLogin() {
        let loginBlock = document.getElementById("login");
        let registerBlock = document.getElementById("signup");
        let forgotPasswordBlock = document.getElementById("forgot_password");
        let loginLink = document.getElementById("login_link");
        let registerLink = document.getElementById("register_link");

        loginBlock.style.display = "block";
        registerBlock.style.display = "none";
        forgotPasswordBlock.style.display = "none";
        loginLink.classList.add("active");
        registerLink.classList.remove("active");
    }

    public displayRegister() {
        let loginBlock = document.getElementById("login");
        let registerBlock = document.getElementById("signup");
        let forgotPasswordBlock = document.getElementById("forgot_password");
        let loginLink = document.getElementById("login_link");
        let registerLink = document.getElementById("register_link");

        loginBlock.style.display = "none";
        registerBlock.style.display = "block";
        forgotPasswordBlock.style.display = "none";
        loginLink.classList.remove("active");
        registerLink.classList.add("active");
    }
}
