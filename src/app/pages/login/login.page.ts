import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth/auth.service';
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
    private authService: AuthenticationService,
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
    console.log(this.credentials.value.email + " | " + this.credentials.value.password)
    this.authService.login(this.credentials.value).subscribe(
      res => {
        this.authService.saveToken(res);
        console.log(res);
        this.router.navigateByUrl('', { replaceUrl: true });
      }
    );
  }


}
