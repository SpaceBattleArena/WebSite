import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  moduleId: module.id,
  selector: 'players-list',
  styleUrls: [ '../../../../assets/css/players_list.component.css' ],
  templateUrl: '../../../templates/players_list.component.html'
})
export class PlayersListComponent implements OnInit {
    allUsers: User[];
    user: User[] = [];
    head_values: string[] = [
        'id', 'username', 'email', 'password', 'rank_id',
        'arena_id', 'avatar_id', 'player_id', 'is_staff',
        'is_activate'
    ];
    body_values: Array<string[]> = [];
    value: any[];
    count: number;
    new_user: any = {};
    is_activate: boolean = false;
    is_staff: boolean = false;
    modify_user: Array<string> = [];
    valid_user: User = new User();

    constructor(private userService: UserService) {
    }

    public add() {
        if (!this.new_user.Name || !this.new_user.Email || !this.new_user.Password) {
            alert('Fill all inputs');
            return;
        }
        let user = {
            first_name : this.new_user.Name,
            last_name : "no use",
            email : this.new_user.Email,
            password : this.new_user.Password
        };
        let user_json = JSON.stringify(user);
    
        this.userService.registration(user_json)
        .subscribe(
            resultArray => {
                this.get_all_users();
                alert(resultArray["message"]);
            },
            error => console.log("Error :: " + error)
        );
    }

    add_user_to_list(user_to_add:User) {
        this.value = [
            user_to_add.ID, user_to_add.Name, user_to_add.Email,
            user_to_add.Password, user_to_add.Rank_id, user_to_add.Arena_id,
            user_to_add.Avatar_id, user_to_add.Player_id,
            user_to_add.Is_staff, user_to_add.Is_activate
        ];
        this.body_values.push(this.value);
    }

    public modify(values:string[], index:number) {
        if(this.modify_user.length != 0) {
            alert("You cound't modify 2 Players in the same time");
            return;
        }
        this.modify_user = Object.assign([], values);
        let modify_button = document.getElementById('modify_'+index.toString());
        let delete_button = document.getElementById('delete_'+index.toString());
        modify_button.style.display = 'none';
        delete_button.style.display = 'none';
        let display_player;
        let i = 0;
        while(i < values.length) {
            display_player = document.getElementById('player_display_'+index.toString()+'_'+i.toString());
            display_player.style.display = 'none';
            i += 1;
        }
        let valid_button = document.getElementById('valid_'+index.toString());
        let cancel_button = document.getElementById('cancel_'+index.toString());
        valid_button.style.display = 'inline';
        cancel_button.style.display = 'inline';
        let display_input;
        i = 0;
        while(i < values.length) {
            display_input = document.getElementById('player_modification_'+index.toString()+'_'+i.toString());
            display_input.style.display = 'block';
            i += 1;
        }
    }

    public delete(id:number) {
    this.userService.delete(id)
      .subscribe(
        data => {
            alert('User deleted');
            this.get_all_users();
        },
        error => {
            alert('Error while deleting');
        }
      );
    }

    public inverse(value:string) {
        if (value == 'is_staff') {
            this.is_staff = !this.is_staff;
        } else {
            this.is_activate = ! this.is_activate;
        }
    }

    public valid_modifications(index:number) {
        this.body_values[index] = Object.assign([], this.modify_user);
        this.valid_user.ID = Number(this.body_values[index][0]);
        this.valid_user.Name = this.body_values[index][1];
        this.valid_user.Email = this.body_values[index][2];
        this.valid_user.Password = this.body_values[index][3];
        this.valid_user.Is_staff = Boolean(this.body_values[index][8]);
        this.userService.update(this.valid_user)
            .subscribe(
                resultArray => {
                    console.log(resultArray);
                    this.get_all_users();
                    alert("update successfull");
                },
                error => {
                    console.log(error);
                }
            );
        this.modify_user = [];
        this.valid_user = new User();
    }

    public cancel_modifications(index:number) {
        let modify_button = document.getElementById('modify_'+index.toString());
        let delete_button = document.getElementById('delete_'+index.toString());
        modify_button.style.display = 'inline';
        delete_button.style.display = 'inline';
        let display_player;
        let i = 0;
        while(i < this.body_values[index].length) {
            display_player = document.getElementById('player_display_'+index.toString()+'_'+i.toString());
            display_player.style.display = 'block';
            i += 1;
        }
        let valid_button = document.getElementById('valid_'+index.toString());
        let cancel_button = document.getElementById('cancel_'+index.toString());
        valid_button.style.display = 'none';
        cancel_button.style.display = 'none';
        let display_input;
        i = 0;
        while(i < this.body_values[index].length) {
            display_input = document.getElementById('player_modification_'+index.toString()+'_'+i.toString());
            display_input.style.display = 'none';
            i += 1;
        }
        this.modify_user = [];
    }

    private get_all_users() {
        this.body_values = [];
        this.userService.getAll()
            .subscribe(
                resultArray => {
                this.allUsers = resultArray["results"]["data"];
                this.allUsers.forEach(user => {
                    this.add_user_to_list(user);
                });
                },
                error => {
                    console.log(error);
                }
            );
    }

    ngOnInit() {
        this.get_all_users();
    }
}