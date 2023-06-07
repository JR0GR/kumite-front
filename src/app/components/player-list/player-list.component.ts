import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {
  @Input() users: User[]

  constructor(private router: Router) { }

  ngOnInit() { }

  goToProfile(user: User) {
    this.router.navigate(['/profile'], {
      state: { user }
    });

  }
}
