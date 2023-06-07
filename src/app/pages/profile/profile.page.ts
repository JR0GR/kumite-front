import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: User;
  regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

  constructor(
    private router: Router,
  ) {
    this.user = this.router.getCurrentNavigation()?.extras?.state?.user;
  }

  ngOnInit() {
    if (!this.user) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
      return;
    }
    console.log(this.user);
  }

}
