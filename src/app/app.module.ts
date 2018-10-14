import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { AngularMaterialModule } from './angular-material/angular-material.module';

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { RouterModule } from '@angular/router/src/router_module';
import { HttpModule } from '@angular/http';

import { LaddaModule } from 'angular2-ladda';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import {
  ProjectsComponent,
  FilterIssueByProject
} from './projects/projects.component';

import { RedmineService } from './services/redmine.service';
import { AuthHelper } from './services/auth-helper.service';
import { CalendarModule} from './calendar/calendar.module';

@NgModule({
  declarations: [AppComponent, ProjectsComponent, FilterIssueByProject],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpModule,
    LaddaModule.forRoot({
      style: 'zoom-in',
      spinnerSize: 30,
      spinnerColor: '#fff'
    }),

    AppRoutingModule,
    LoginModule,
    CalendarModule
  ],
  providers: [RedmineService, AuthHelper],
  bootstrap: [AppComponent]
})
export class AppModule {}
