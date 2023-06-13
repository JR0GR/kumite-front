import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/apiModels/user.model';
import { UsersService } from 'src/app/core/services/api/users/users.service';
import { ImagesService } from 'src/app/core/services/images/images.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() backButton = false
  @Input() loginPage = false

  me: User;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private imagesService: ImagesService
  ) {
    this.usersService.getMe().then(async (res) => {
      res.base64 = await this.imagesService.getCacheImagen(res.pictureId)
      this.me = res;

    })
  }

  ngOnInit() { }

  goToProfile() {
    this.router.navigate(['/profile'], {
      state: { user: this.me }
    });

  }

}
