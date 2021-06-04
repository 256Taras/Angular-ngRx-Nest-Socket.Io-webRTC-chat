import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { select, Store } from '@ngrx/store';
import { isSubmittingSelector, UserPhoneSelector } from '../../../store/selectors/sign-in.selector';


export class CodeStepUtils {

  public formG: FormGroup;
  public isSubmitting$: Observable<boolean>;
  public userPhone: string;

  constructor(public formBuilder: FormBuilder, public store: Store) {
  }

  protected initForm(): void {
    this.formG = this.formBuilder.group({
      code: ['',
        [
          Validators.pattern(new RegExp('[0-9]{4}')),
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
        ],
      ],
    });
  }

  protected initValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.store.pipe(select(UserPhoneSelector)).subscribe(
      (v) => {
        this.userPhone = v;
      },
    );
  }


}
