import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {Observable} from 'rxjs/internal/Observable';
import {SignUpAction} from '../../store/action-creators/sign-up.action';
import {isSubmittingSelector} from "../../store/selectors/sign-up.selector";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

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
      email: ['', Validators.required, , Validators.email],
      password: ['', Validators.required,],
      confirmPassword: ['', Validators.required,],
    })
  }

  public onSubmit(): void {
    this.store.dispatch(SignUpAction(this.formG.value));
    console.log(this.formG.value);
    console.log(this.formG.valid);
  }

  private initValues() {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    console.log(this.isSubmitting$)
  }
}
