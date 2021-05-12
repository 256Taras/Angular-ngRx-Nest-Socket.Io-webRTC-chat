import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/internal/Observable";
import {select, Store} from "@ngrx/store";
import {isSubmittingSelector} from "../../../../store/selectors/sign-up.selector";
import {NextStepAction, PrevStepAction} from "../../../../store/action-creators/step.action";
import {UserInterface} from "../../../../../shared/interfaces/user.interface";
import {AddUserCodeAction} from "../../../../store/action-creators/sign-up.action";

@Component({
  selector: 'am-enter-code',
  templateUrl: './enter-code.component.html',
  styleUrls: ['./enter-code.component.css']
})
export class EnterCodeComponent implements OnInit {

  public formG: FormGroup;
  public isSubmitting$: Observable<boolean>;

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

    const conde = {code: this.formG.value.code}
    if (this.formG.valid) {
      console.log({code: this.formG.value.code})
      this.store.dispatch(AddUserCodeAction(conde));
      this.store.dispatch(NextStepAction());

    }
    console.log(this.formG.value);
    console.log(this.formG.valid);
  }

  private initValues() {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))

  }


}
