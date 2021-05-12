import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/internal/Observable";
import {select, Store} from "@ngrx/store";
import {AddUserInitialsAction, AddUserPhoneAction} from "../../../../store/action-creators/sign-up.action";
import {isSubmittingSelector} from "../../../../store/selectors/sign-up.selector";
import {UserInterface} from "../../../../../shared/interfaces/user.interface";
import {NextStepAction} from "../../../../store/action-creators/step.action";

@Component({
  selector: 'am-enter-phone',
  templateUrl: './enter-phone.component.html',
  styleUrls: ['./enter-phone.component.css']
})
export class EnterPhoneComponent implements OnInit {


  public formG: FormGroup;
  public isSubmitting$: Observable<boolean>;

  constructor(private formBuilder: FormBuilder, private store: Store) {
  }

  public ngOnInit(): void {
    this.initForm();
    this.initValues();
  }

  private initForm() {
    this.formG = this.formBuilder.group({
      phone: ['+380',[Validators.required,Validators.pattern(new RegExp("[0-9]{12}")),Validators.maxLength(13)]],
    })
  }

  public onSubmit(): void {

    if (this.formG.valid) {
      this.store.dispatch(AddUserPhoneAction(this.formG.value.phone));
      this.nextStep()
    }
  }
  private nextStep(){
    this.store.dispatch(NextStepAction());
  }


  private initValues() {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))

  }

}
