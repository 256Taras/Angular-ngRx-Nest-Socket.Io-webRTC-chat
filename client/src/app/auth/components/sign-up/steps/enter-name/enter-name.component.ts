import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, MaxLengthValidator, Validators} from "@angular/forms";
import {Observable} from "rxjs/internal/Observable";
import {select, Store} from "@ngrx/store";
import {AddUserInitialsAction, SignUpAction} from "../../../../store/action-creators/sign-up.action";
import {isSubmittingSelector} from "../../../../store/selectors/sign-up.selector";
import {UserInterface} from "../../../../../shared/interfaces/user.interface";
import {NextStepAction} from "../../../../store/action-creators/step.action";

@Component({
  selector: 'am-enter-name',
  templateUrl: './enter-name.component.html',
  styleUrls: ['./enter-name.component.css']
})
export class EnterNameComponent implements OnInit {


  public formG: FormGroup;
  public isSubmitting$: Observable<boolean>;
  public isFormValid: unknown;

  constructor(private formBuilder: FormBuilder, private store: Store) {
  }

  public ngOnInit(): void {
    this.initForm();
    this.initValues();
  }

  public initForm() {
    this.formG = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)])
    });

  }

  public onSubmit(): void {
    const user: UserInterface = {
      firstname: this.formG.value.firstname,
      lastname: this.formG.value.lastname,
    }

    if (this.formG.valid) {

      this.store.dispatch(AddUserInitialsAction({user}));
      this.store.dispatch(NextStepAction());
    }
    console.log(this.formG.value);
    console.log(this.formG.valid);
  }

  private initValues() {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
  }

}
