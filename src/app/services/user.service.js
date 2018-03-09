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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/Rx");
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this._postsURL = "http://localhost:3000/";
    }
    UserService.prototype.registration = function (user) {
        var data = new http_1.URLSearchParams();
        data.append("first_name", JSON.parse(user).first_name);
        data.append("last_name", JSON.parse(user).last_name);
        data.append("email", JSON.parse(user).email);
        data.append("password", JSON.parse(user).password);
        return this.http
            .post(this._postsURL + "signup", data)
            .map(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    UserService.prototype.signin = function (user) {
        var data = new http_1.URLSearchParams();
        data.append("email", JSON.parse(user).email);
        data.append("password", JSON.parse(user).password);
        return this.http
            .post(this._postsURL + "signin", data)
            .map(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    UserService.prototype.logout = function () {
        localStorage.removeItem('currentUser');
    };
    UserService.prototype.getInformation = function (token) {
        var add_headers = new http_1.Headers();
        add_headers.append('Authorization', token);
        add_headers.append('Accept', 'application/json');
        add_headers.append('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
        add_headers.append('Access-Control-Allow-Origin', '*');
        add_headers.append('Access-Control-Allow-Headers', "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");
        var options = new http_1.RequestOptions({ headers: add_headers });
        return this.http
            .get(this._postsURL + "getInformation", options)
            .map(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    UserService.prototype.getAll = function () {
        return this.http
            .get(this._postsURL + "user/getAll")
            .map(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    UserService.prototype.update = function (user) {
        var body = {
            "id": user.ID,
            "name": user.Name,
            "password": user.Password,
            "mail": user.Email,
            "is_staff": user.Is_staff
        };
        return this.http.put(this._postsURL + "user/update", body)
            .map(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    UserService.prototype.delete = function (id) {
        var body = {
            "id": id
        };
        return this.http.delete(this._postsURL + "user/delete", { body: body })
            .map(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    UserService.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error.statusText);
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map