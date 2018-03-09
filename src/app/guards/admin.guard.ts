import { Injectable, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Http } from "@angular/http";

import { UserService } from '../services/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
    is_staff = false;

    constructor(private router: Router, private _http: Http) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // let userService = new UserService(this._http);
        // let is_staff = false;
        // if (this.getInfo()) {
        //     return true;
        // } else {
        //     // not logged in so redirect to login page
        //     //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        //     return false;
        // }
        return true;
    }

    getInfo(): any {
        // if (localStorage.getItem('currentUser')) {
        //     let userService = new UserService(this._http);
        //     let is_staff = null;
        //     return new Promise(resolve => {
        //         userService.getInformation(JSON.parse(localStorage.getItem('currentUser')).token)
        //             .subscribe(
        //                 resultArray => {
        //                     console.log(resultArray);
        //                     this.is_staff = resultArray["results"]["data"][0]["Is_staff"];
        //                     if (this.is_staff) {
        //                         resolve(true);
        //                     } else {
        //                         //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        //                         resolve(false);
        //                     }
        //                 },
        //                 error => {
        //                     console.log(error);
        //                     //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        //                     resolve(false);
        //                 }
        //             );
        //     });
                //return is_staff;
        //}
    }
}