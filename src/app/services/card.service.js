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
var CardService = /** @class */ (function () {
    function CardService(http) {
        this.http = http;
        this._postsURL = "http://localhost:3000/";
    }
    CardService.prototype.getCards = function (token) {
        var add_headers = new http_1.Headers();
        add_headers.append('Authorization', token);
        add_headers.append('Accept', 'application/json');
        add_headers.append('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
        add_headers.append('Access-Control-Allow-Origin', '*');
        add_headers.append('Access-Control-Allow-Headers', "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");
        var options = new http_1.RequestOptions({ headers: add_headers });
        return this.http
            .get(this._postsURL + "card", options)
            .map(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    CardService.prototype.getDecks = function (token) {
        var add_headers = new http_1.Headers();
        add_headers.append('Authorization', token);
        add_headers.append('Accept', 'application/json');
        add_headers.append('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
        add_headers.append('Access-Control-Allow-Origin', '*');
        add_headers.append('Access-Control-Allow-Headers', "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");
        var options = new http_1.RequestOptions({ headers: add_headers });
        return this.http
            .get(this._postsURL + "deck", options)
            .map(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    CardService.prototype.getRank = function (token) {
        var add_headers = new http_1.Headers();
        add_headers.append('Authorization', token);
        add_headers.append('Accept', 'application/json');
        add_headers.append('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
        add_headers.append('Access-Control-Allow-Origin', '*');
        add_headers.append('Access-Control-Allow-Headers', "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");
        var options = new http_1.RequestOptions({ headers: add_headers });
        return this.http
            .get(this._postsURL + "getRank", options)
            .map(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    CardService.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error.statusText);
    };
    CardService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], CardService);
    return CardService;
}());
exports.CardService = CardService;
//# sourceMappingURL=card.service.js.map