import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { InputModule } from 'src/app/components/form-components/input/input.module';
import { SelectModule } from "../../components/form-components/select/select.module";

@NgModule({
  declarations: [RegisterPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    ReactiveFormsModule,
    HeaderModule,
    InputModule,
    SelectModule
  ]
})
export class RegisterPageModule { }
