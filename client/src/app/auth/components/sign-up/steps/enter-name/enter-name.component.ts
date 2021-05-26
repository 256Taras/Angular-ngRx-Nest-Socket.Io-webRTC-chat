import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, MaxLengthValidator, Validators} from "@angular/forms";
import {Observable} from "rxjs/internal/Observable";
import {select, Store} from "@ngrx/store";
import {AddUserInitialsAction, SignUpAction} from "../../../../store/action/sign-up.action";
import {isSubmittingSelector} from "../../../../store/selectors/sign-up.selector";
import {UserInterface} from "../../../../../shared/interfaces/user.interface";
import {ClearStepStatus, NextStepAction, PrevStepAction} from "../../../../store/action/step.action";

@Component({
  selector: 'am-enter-name',
  templateUrl: './enter-name.component.html',
  styleUrls: ['./enter-name.component.css']
})
export class EnterNameComponent implements OnInit {


  public formG: FormGroup;
  public isSubmitting$: Observable<boolean>;


  constructor(private formBuilder: FormBuilder, private store: Store) {
  }

  public ngOnInit(): void {
    this.initForm();
    this.initValues();
  }

  public initForm() {
    this.formG = new FormGroup({
      nikname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      firstname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)])
    });

  }

  public onSubmit(): void {



  }

  private initValues() {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
  }

 private backToPhoneStep() {
    this.store.dispatch(PrevStepAction());
  }

  nextStep() {
    const user: UserInterface = {
      nikname: this.formG.value.nikname,
      firstname: this.formG.value.firstname,
      lastname: this.formG.value.lastname,
    }
    if (this.formG.valid && user.lastname && user.lastname && user.nikname) {

      this.store.dispatch(AddUserInitialsAction({user}));
      this.store.dispatch(NextStepAction());
      this.store.dispatch(ClearStepStatus());
    }


  }
}
