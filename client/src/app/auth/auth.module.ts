import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import { SignUpComponent } from 'src/app/auth/components/sign-up/sign-up.component';
import { SingInComponent } from 'src/app/auth/components/sing-in/sing-in.component';
import {ReactiveFormsModule} from "@angular/forms";


const routes:Routes = [
  {
    path:'sing-in',
    component:SingInComponent
  },
  {
    path:'sing-up',
    component:SignUpComponent
  },
]

@NgModule({
  declarations: [SignUpComponent, SingInComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class AuthModule { }
