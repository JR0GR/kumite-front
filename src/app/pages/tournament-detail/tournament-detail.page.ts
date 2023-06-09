import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/apiModels/user.model';
import { UsersService } from 'src/app/core/services/api/users/users.service';

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.page.html',
  styleUrls: ['./tournament-detail.page.scss'],
})
export class TournamentDetailPage implements OnInit {
  users: User[];

  constructor(private usersService: UsersService) { }

  ionViewWillEnter() {
    this.usersService.get().subscribe(res => {
      this.users = res;
    })
  }

  ngOnInit() {
  }

}
