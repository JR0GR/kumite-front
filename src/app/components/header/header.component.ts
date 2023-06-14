import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/core/models/apiModels/profile.model';
import { User } from 'src/app/core/models/apiModels/user.model';
import { UsersService } from 'src/app/core/services/api/users/users.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ImagesService } from 'src/app/core/services/images/images.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() backButton = false
  @Input() loginPage = false
  @Input() defaultHref?: string

  me: User;
  profile: Profile;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private authService: AuthService
  ) {
    this.usersService.getMe().then((res) => {
      this.me = res;
    })
    this.authService.myPrfoile().then((res) => {
      this.profile = res;
    })
  }

  ngOnInit() { }

  goToProfile() {
    this.router.navigate(['/profile'], {
      state: { user: this.me }
    });

  }

}
