import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/internal/Observable";
import {select, Store} from "@ngrx/store";
import {
  AddUserInitialsAction,
  AddUserPhoneAction,
  SendUserPhoneAction
} from "../../../../store/action/sign-up.action";
import {BackendErrors, isSubmittingSelector, SmsEndowedSelector} from "../../../../store/selectors/sign-up.selector";
import {UserInterface} from "../../../../../shared/interfaces/user.interface";
import {NextStepAction} from "../../../../store/action/step.action";
import {Subscription} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'am-enter-phone',
  templateUrl: './enter-phone.component.html',
  styleUrls: ['./enter-phone.component.css']
})
export class EnterPhoneComponent implements OnInit, OnDestroy {


  public formG: FormGroup;
  public isSubmitting$: Observable<boolean>;
  public backendErrors$: Observable<string>;
  public smsEndowed$: Observable<boolean>;


  constructor(private formBuilder: FormBuilder, private store: Store) {

  }

  public ngOnInit(): void {
    this.initValues();
    this.initForm();
  }

  public ngOnDestroy(): void {
    this.unsubscribe()
  }

  private initForm() {
    this.formG = this.formBuilder.group({
      phone: ['+380', [Validators.required, Validators.pattern(new RegExp("[0-9]{12}")), Validators.maxLength(13)]],
    })
  }

  public onSubmit(): void {
    if (this.formG.valid) {

      this.store.dispatch(AddUserPhoneAction({phone: this.formG.value.phone}));
      this.store.dispatch(SendUserPhoneAction({phone: this.formG.value.phone}));
      this.nextStep()
    }
  }


  private initValues() {
    this.isSubmitting$ = this.store.select(isSubmittingSelector);
    this.backendErrors$ = this.store.select(BackendErrors);
    this.smsEndowed$ = this.store.select(SmsEndowedSelector);

  }


  private nextStep() {
    this.store.dispatch(NextStepAction());
  }

  private unsubscribe() {

  }


}
