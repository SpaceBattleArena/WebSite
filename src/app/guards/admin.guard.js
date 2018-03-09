"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var AdminGuard = /** @class */ (function () {
    function AdminGuard(router, _http) {
        this.router = router;
        this._http = _http;
        this.is_staff = false;
    }
    AdminGuard.prototype.canActivate = function (route, state) {
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
    };
    AdminGuard.prototype.getInfo = function () {
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
    };
    AdminGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router, http_1.Http])
    ], AdminGuard);
    return AdminGuard;
}());
exports.AdminGuard = AdminGuard;
//# sourceMappingURL=admin.guard.js.map