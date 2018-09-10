import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Error } from '../../models/error';

@Component({
    moduleId: module.id,
    templateUrl: '../../templates/register.component.html',
    styleUrls: [ '../../../assets/css/register.component.css' ],
})

export class RegisterComponent {
    model: any = {};
    loading = false;
    new_user: any = {};
    private error: Error = null;

    constructor(
        private router: Router,
        private userService: UserService) { }

    register() {
        let user = {
            first_name : "Adrientest111",
            last_name : "Musserottetest111",
            email : "adrien.musserottetest111@gmail.com",
            password : "Crane1309test111"
        };
    
        let user_json = JSON.stringify(this.model);
    
        this.userService.registration(user_json)
        .subscribe(
            resultArray => {
                alert(resultArray["message"]);
                this.router.navigate(['login']);
            },
            error => console.log("Error :: " + error)
        );
    }
}