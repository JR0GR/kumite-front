import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/api/users/users.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  login() {
    if (!this.credentials.valid) {
      this.toastService.presentToast('Email and/or password incorrect', false);
      return;
    }
    this.authService.login(this.credentials.value).subscribe(
      async res => {
        this.authService.saveToken(res);
        await this.usersService.saveMe();
      }
    );
  }

  goToRegister() {
    this.router.navigateByUrl('/register', { replaceUrl: true });
  }


}
