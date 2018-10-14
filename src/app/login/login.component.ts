import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { AuthHelper } from '../services/auth-helper.service';

import { User } from '../models/redmine.model';
import { Error } from '../models/response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  isLogged: boolean = false;

  user: User = {};
  error: Error;

  constructor(
    private router: Router,
    private authHelper: AuthHelper,
    private authService: AuthService
  ) {}

  logInUser() {
    this.loading = true;
    this.error = {};
    this.authService.loginRM(this.user).subscribe(
      res => {
        this.onLogin(res.user);
      },
      err => {
        this.error = err;
        this.loading = false;
      }
    );
  }

  private onLogin(user: User) {
    this.loading = false;
    this.isLogged = true;

    this.authHelper.AuthorizeUser(user);

    setTimeout(() => this.router.navigate(['projects']), 1000);
  }
  ngOnInit() {}
}
