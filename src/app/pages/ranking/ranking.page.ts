import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/apiModels/user.model';
import { UsersService } from 'src/app/core/services/api/users/users.service';
import { ImagesService } from 'src/app/core/services/images/images.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {
  users: User[];
  sorteredUsers: User[];
  winsFilter = false;
  tournamentsFilter = false;
  sort = null;

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
      this.sorteredUsers = this.users;
    })
  }

  sortedUsers() {
    let tmp = [...this.users]
    if (this.sort === null) {
      this.sorteredUsers = tmp;
    } else if (!this.sort) {
      this.sorteredUsers = tmp.sort((a, b) => b.wins - a.wins);
    }
    else if (this.sort) {
      this.sorteredUsers = tmp.sort((a, b) => b.tournaments.length - a.tournaments.length);
    }
    console.log(this.sorteredUsers)
  }

  changeActiveSort(state: boolean) {
    if (this.sort === null || !this.sort === state) this.sort = state;
    else if (this.sort === state) this.sort = null;
    this.sortedUsers()
  }

}
