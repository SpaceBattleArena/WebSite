import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Error } from '../../models/error';
declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'admin',  // <admin></admin>
  styleUrls: [ '../../../assets/css/admin.component.css' ],
  templateUrl: '../../templates/admin.component.html',
  providers: [UserService]
})
export class AdminComponent implements OnInit {
    currentUser: User;
    user: User[] = [];
    is_staff = false;
    private error: Error = null;

    constructor(private router: Router, private userService: UserService) {
    }

    ngOnInit() {
        $('body').addClass("fixed-sn black-skin");
        $('body').css('background-image', 'none');
        $('body').css('background-color', '#dadada');
        $('#ships').css('display', 'none');
        $('.small-nav-bttom').css('background-color', '#000614');
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser) {
            this.userService.getInformation(this.currentUser["token"])
                .subscribe(
                    resultArray => {
                        console.log(resultArray);
                        this.is_staff = resultArray["results"]["data"][0]["Is_staff"];
                        if(!this.is_staff) {
                            this.router.navigate(['/login']);
                        }
                    }
                )
        }
    }
}