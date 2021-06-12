import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Store } from '@ngrx/store';

import { CheckUserCodeAction, SubmittingAction } from '../../../../store/action/sign-up.action';

import { CodeStepUtils } from '../../../utils/base-step-utils/code-step-utils';


@Component({
  selector: 'am-enter-user-code',
  templateUrl: './enter-user-code.component.html',
  styleUrls: ['./enter-user-code.component.css'],
})
export class EnterUserCodeComponent extends CodeStepUtils implements OnInit {

  public formG: FormGroup;

  constructor(public formBuilder: FormBuilder, public store: Store) {
    super(formBuilder, store);
  }

  public ngOnInit(): void {
    this.initForm();
    this.initValues();
  }





  public onSubmit(): void {
    const conde = { code: this.formG.value.code, phone: this.userPhone };
    if (this.formG.valid && this.userPhone) {
      this.store.dispatch(CheckUserCodeAction(conde));
   //   this.store.dispatch(SubmittingAction(conde));

    }
  }




}
