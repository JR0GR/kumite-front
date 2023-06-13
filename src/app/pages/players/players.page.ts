import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/apiModels/user.model';
import { UsersService } from 'src/app/core/services/api/users/users.service';
import { ImagesService } from 'src/app/core/services/images/images.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {
  users: User[];
  filteredUsers: User[];

  constructor(
    private usersService: UsersService,
    private imagesService: ImagesService
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.usersService.get().subscribe(res => {
      res.forEach(async res => {
        res.base64 = await this.imagesService.getCacheImagen(res.pictureId);
      })
      this.users = res;
      this.filteredUsers = this.users;
    })
  }

  filterUsers(value: string) {
    this.filteredUsers = value ? this.users.filter(user => user.nickname.startsWith(value)) : this.users;
  }


}
