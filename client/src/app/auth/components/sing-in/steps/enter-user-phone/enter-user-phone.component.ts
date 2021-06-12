import { Component, OnInit } from '@angular/core';
import {PhoneStepUtils} from "../../../utils/base-step-utils/phone-step-utils";
import {FormBuilder} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AddUserPhoneAction, SendUserPhoneAction} from "../../../../store/action/sign-up.action";
import {SendSmsToUserAction} from "../../../../store/action/sign-in.action";

@Component({
  selector: 'app-enter-user-phone',
  templateUrl: './enter-user-phone.component.html',
  styleUrls: ['./enter-user-phone.component.css']
})
export class EnterUserPhoneComponent extends PhoneStepUtils implements OnInit  {

  constructor(public formBuilder: FormBuilder, public store: Store) {
    super(formBuilder,store)
  }
  public ngOnInit(): void {
    this.initValues();
    this.initForm();
    console.log(this.formG.value.phone);
  }
  public onSubmit(): void {
    if (this.formG.valid) {
      this.store.dispatch(SendSmsToUserAction({phone: this.formG.value.phone}));
      this.nextStep()
    }
  }
}
