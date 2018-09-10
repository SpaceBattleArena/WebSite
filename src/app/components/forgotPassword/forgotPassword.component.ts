import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../services/user.service';
import { Error } from '../../models/error';

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
    private error: Error = null;

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
                    this.error = new Error("Succes", "Votre mot de passe à été modifié", 3, false);
                }
            },
            error => {
                this.error = new Error("Erreur", error, 3, true);
            }
        )
    }
}
