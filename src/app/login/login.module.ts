import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LaddaModule } from 'angular2-ladda';

import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';

@NgModule({
  imports: [CommonModule, FormsModule, AngularMaterialModule, LaddaModule],
  declarations: [LoginComponent],
  providers: [AuthService]
})
export class LoginModule {}
