import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/internal/Observable";
import {select, Store} from "@ngrx/store";
import {isSubmittingSelector, UserPhoneSelector} from "../../../../store/selectors/sign-up.selector";
import {CheckUserCodeAction, SubmittingAction} from "../../../../store/action/sign-up.action";
import { PrevStepAction } from '../../../../store/action/step.action';



@Component({
  selector: 'am-enter-code',
  templateUrl: './enter-code.component.html',
  styleUrls: ['./enter-code.component.css']
})
export class EnterCodeComponent implements OnInit {

  public formG: FormGroup;
  public isSubmitting$: Observable<boolean>;
  private userPhone: string;

  constructor(private formBuilder: FormBuilder, private store: Store) {
  }

  public ngOnInit(): void {
    this.initForm();
    this.initValues();
  }

  public initForm() {
    this.formG = this.formBuilder.group({
      code: ['',
        [
          Validators.pattern(new RegExp("[0-9]{4}")),
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4)
        ]
      ],
    })
  }


  public onSubmit(): void {
    const conde = {code: this.formG.value.code,phone: this.userPhone}
    if (this.formG.valid && this.userPhone) {
      this.store.dispatch(CheckUserCodeAction(conde));
      this.store.dispatch(SubmittingAction(conde))

    }
  }

  private initValues():void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))

    this.store.pipe(select(UserPhoneSelector)).subscribe(
      (v)=>{
        this.userPhone = v
      }

    )
  }

  public backToPhoneStep():void {
    this.store.dispatch(PrevStepAction());

  }



}
