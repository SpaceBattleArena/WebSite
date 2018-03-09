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
var user_service_1 = require("../../../services/user.service");
var user_1 = require("../../../models/user");
var PlayersListComponent = /** @class */ (function () {
    function PlayersListComponent(userService) {
        this.userService = userService;
        this.user = [];
        this.head_values = [
            'id', 'username', 'email', 'password', 'rank_id',
            'arena_id', 'avatar_id', 'player_id', 'is_staff',
            'is_activate'
        ];
        this.body_values = [];
        this.new_user = {};
        this.is_activate = false;
        this.is_staff = false;
        this.modify_user = [];
        this.valid_user = new user_1.User();
    }
    PlayersListComponent.prototype.add = function () {
        var _this = this;
        if (!this.new_user.Name || !this.new_user.Email || !this.new_user.Password) {
            alert('Fill all inputs');
            return;
        }
        var user = {
            first_name: this.new_user.Name,
            last_name: "no use",
            email: this.new_user.Email,
            password: this.new_user.Password
        };
        var user_json = JSON.stringify(user);
        this.userService.registration(user_json)
            .subscribe(function (resultArray) {
            _this.get_all_users();
            alert(resultArray["message"]);
        }, function (error) { return console.log("Error :: " + error); });
    };
    PlayersListComponent.prototype.add_user_to_list = function (user_to_add) {
        this.value = [
            user_to_add.ID, user_to_add.Name, user_to_add.Email,
            user_to_add.Password, user_to_add.Rank_id, user_to_add.Arena_id,
            user_to_add.Avatar_id, user_to_add.Player_id,
            user_to_add.Is_staff, user_to_add.Is_activate
        ];
        this.body_values.push(this.value);
    };
    PlayersListComponent.prototype.modify = function (values, index) {
        if (this.modify_user.length != 0) {
            alert("You cound't modify 2 Players in the same time");
            return;
        }
        this.modify_user = Object.assign([], values);
        var modify_button = document.getElementById('modify_' + index.toString());
        var delete_button = document.getElementById('delete_' + index.toString());
        modify_button.style.display = 'none';
        delete_button.style.display = 'none';
        var display_player;
        var i = 0;
        while (i < values.length) {
            display_player = document.getElementById('player_display_' + index.toString() + '_' + i.toString());
            display_player.style.display = 'none';
            i += 1;
        }
        var valid_button = document.getElementById('valid_' + index.toString());
        var cancel_button = document.getElementById('cancel_' + index.toString());
        valid_button.style.display = 'inline';
        cancel_button.style.display = 'inline';
        var display_input;
        i = 0;
        while (i < values.length) {
            display_input = document.getElementById('player_modification_' + index.toString() + '_' + i.toString());
            display_input.style.display = 'block';
            i += 1;
        }
    };
    PlayersListComponent.prototype.delete = function (id) {
        var _this = this;
        this.userService.delete(id)
            .subscribe(function (data) {
            alert('User deleted');
            _this.get_all_users();
        }, function (error) {
            alert('Error while deleting');
        });
    };
    PlayersListComponent.prototype.inverse = function (value) {
        if (value == 'is_staff') {
            this.is_staff = !this.is_staff;
        }
        else {
            this.is_activate = !this.is_activate;
        }
    };
    PlayersListComponent.prototype.valid_modifications = function (index) {
        var _this = this;
        this.body_values[index] = Object.assign([], this.modify_user);
        this.valid_user.ID = Number(this.body_values[index][0]);
        this.valid_user.Name = this.body_values[index][1];
        this.valid_user.Email = this.body_values[index][2];
        this.valid_user.Password = this.body_values[index][3];
        this.valid_user.Is_staff = Boolean(this.body_values[index][8]);
        this.userService.update(this.valid_user)
            .subscribe(function (resultArray) {
            console.log(resultArray);
            _this.get_all_users();
            alert("update successfull");
        }, function (error) {
            console.log(error);
        });
        this.modify_user = [];
        this.valid_user = new user_1.User();
    };
    PlayersListComponent.prototype.cancel_modifications = function (index) {
        var modify_button = document.getElementById('modify_' + index.toString());
        var delete_button = document.getElementById('delete_' + index.toString());
        modify_button.style.display = 'inline';
        delete_button.style.display = 'inline';
        var display_player;
        var i = 0;
        while (i < this.body_values[index].length) {
            display_player = document.getElementById('player_display_' + index.toString() + '_' + i.toString());
            display_player.style.display = 'block';
            i += 1;
        }
        var valid_button = document.getElementById('valid_' + index.toString());
        var cancel_button = document.getElementById('cancel_' + index.toString());
        valid_button.style.display = 'none';
        cancel_button.style.display = 'none';
        var display_input;
        i = 0;
        while (i < this.body_values[index].length) {
            display_input = document.getElementById('player_modification_' + index.toString() + '_' + i.toString());
            display_input.style.display = 'none';
            i += 1;
        }
        this.modify_user = [];
    };
    PlayersListComponent.prototype.get_all_users = function () {
        var _this = this;
        this.body_values = [];
        this.userService.getAll()
            .subscribe(function (resultArray) {
            _this.allUsers = resultArray["results"]["data"];
            _this.allUsers.forEach(function (user) {
                _this.add_user_to_list(user);
            });
        }, function (error) {
            console.log(error);
        });
    };
    PlayersListComponent.prototype.ngOnInit = function () {
        this.get_all_users();
    };
    PlayersListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'players-list',
            styleUrls: ['../../../../../assets/css/players_list.component.css'],
            templateUrl: '../../../templates/players_list.component.html'
        }),
        __metadata("design:paramtypes", [user_service_1.UserService])
    ], PlayersListComponent);
    return PlayersListComponent;
}());
exports.PlayersListComponent = PlayersListComponent;
//# sourceMappingURL=players_list.component.js.map