import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [CommonModule, FormsModule, AngularMaterialModule],
  declarations: [LoginComponent]
})
export class LoginModule {}
