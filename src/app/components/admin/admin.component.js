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
var AdminComponent = /** @class */ (function () {
    function AdminComponent(router, userService) {
        this.router = router;
        this.userService = userService;
        this.user = [];
        this.is_staff = false;
    }
    AdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser) {
            this.userService.getInformation(this.currentUser["token"])
                .subscribe(function (resultArray) {
                console.log(resultArray);
                _this.is_staff = resultArray["results"]["data"][0]["Is_staff"];
                if (!_this.is_staff) {
                    _this.router.navigate(['/login']);
                }
                $('body').addClass("fixed-sn black-skin");
                $('body').css('background-image', 'none');
            });
        }
    };
    AdminComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'admin',
            styleUrls: ['../../../../assets/css/admin.component.css'],
            templateUrl: '../../templates/admin.component.html',
            providers: [user_service_1.UserService]
        }),
        __metadata("design:paramtypes", [router_1.Router, user_service_1.UserService])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map