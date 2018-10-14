import { Component, OnInit } from '@angular/core';
import { RedmineService } from '../services/redmine.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  isLogged: boolean = false;

  user: any = {
    username: '',
    password: ''
  };

  constructor(private redmineService: RedmineService) {}

  onLogin() {
    this.loading = true;
    this.redmineService
      .loginRM(this.user)
      .subscribe(res => {
        this.loading= false;
        this.isLogged = true;
      }, err=>{
        this.loading=false;
      });
  }

  ngOnInit() {}
}
