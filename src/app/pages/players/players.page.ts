import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/apiModels/user.model';
import { UsersService } from 'src/app/core/services/api/users/users.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {
  users: User[];
  filteredUsers: User[];

  constructor(private usersService: UsersService) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.usersService.get().subscribe(res => {
      this.users = res;
      this.filteredUsers = this.users;
    })
  }

  filterUsers(value: string) {
    this.filteredUsers = value ? this.users.filter(user => user.nickname.startsWith(value)) : this.users;
  }


}
