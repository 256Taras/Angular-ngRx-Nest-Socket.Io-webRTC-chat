import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SingInComponent } from './components/sing-in/sing-in.component';
import {RouterModule, Routes} from "@angular/router";

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
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
