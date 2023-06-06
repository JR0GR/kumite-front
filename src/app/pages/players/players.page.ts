import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/api/users/users.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.get().subscribe(res => console.log(res))
  }

}
