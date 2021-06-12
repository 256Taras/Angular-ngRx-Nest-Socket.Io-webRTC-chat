import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/internal/Observable';
import {Store} from '@ngrx/store';
import {
  BackendErrors,
  isSubmittingSelector,
  SmsEndowedSelector
} from 'src/app/auth/store/selectors/sign-up.selector';
import {NextStepAction} from '../../../store/action/step.action';
import { BackendErrorsSelector } from '../../../store/selectors/sign-in.selector';


export class PhoneStepUtils {


  public formG: FormGroup;
  public isSubmitting$: Observable<boolean>;
  public backendErrors$: Observable<string>;
  public smsEndowed$: Observable<boolean>;

  constructor(protected formBuilder: FormBuilder, protected store: Store) {

  }

  protected initForm() {
    this.formG = this.formBuilder.group({
      phone: ['+380', [Validators.required, Validators.pattern(new RegExp('[0-9]{12}')), Validators.maxLength(13)]],
    });
  }

  protected initValues() {
    this.isSubmitting$ = this.store.select(isSubmittingSelector);
    this.backendErrors$ = this.store.select(BackendErrorsSelector);
    this.smsEndowed$ = this.store.select(SmsEndowedSelector);
  }

  protected nextStep() {
    this.store.dispatch(NextStepAction());
  }


}
