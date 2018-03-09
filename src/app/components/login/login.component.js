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
var user_service_1 = require("../../services/user.service");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(route, router, userService) {
        this.route = route;
        this.router = router;
        this.userService = userService;
        this.model = {};
        this.loading = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        var user_json = JSON.stringify(this.model);
        console.log(this.model);
        this.userService.signin(user_json)
            .subscribe(function (resultArray) {
            console.log(resultArray);
            var current_user = {
                token: resultArray["results"]["token"],
                Email: resultArray["results"]["user"]["Email"],
                ID: resultArray["results"]["user"]["Id"],
                Name: resultArray["results"]["user"]["Name"],
            };
            localStorage.setItem('currentUser', JSON.stringify(current_user));
            _this.router.navigate(['/']);
        }, function (error) { return console.log("Error :: " + error); });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: '../../templates/login.component.html',
            styleUrls: ['../../../../assets/css/login.component.css'],
            selector: 'logister',
            providers: [user_service_1.UserService]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            user_service_1.UserService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map