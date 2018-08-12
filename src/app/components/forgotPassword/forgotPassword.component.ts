import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
    moduleId: module.id,
    templateUrl: '../../templates/forgotPassword.component.html',
    styleUrls: [ '../../../assets/css/forgotPassword.component.css' ],
    selector: 'forgotPassword',
    providers: [UserService]
})

export class forgotPasswordComponent implements OnInit {
    model: any = {};
    loading = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService) { }

    ngOnInit() {
    }

    public newPassword() {
        this.userService.updateForgotPassword(this.model)
        .subscribe(
            results => {
                console.log(results);
                if (results["results"]["status"] === 200) {
                    alert("Votre mot de passe à été modifié");
                }
            }
        )
    }
}
