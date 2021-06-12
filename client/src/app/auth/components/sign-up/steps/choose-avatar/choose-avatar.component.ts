import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/internal/Observable";
import {select, Store} from "@ngrx/store";
import {
  AddUserAvatarAction,
  AddUserInitialsAction,
  SignUpAction
} from "../../../../store/action/sign-up.action";
import {isSubmittingSelector, UserInitialSelector, UserSelector} from "../../../../store/selectors/sign-up.selector";
import {iif, Subscription} from "rxjs";
import {map} from "rxjs/operators";
import {UserInterface} from "../../../../../shared/interfaces/user.interface";
import { PrevStepAction } from '../../../../store/action/step.action';


@Component({
  selector: 'am-choose-avatar',
  templateUrl: './choose-avatar.component.html',
  styleUrls: ['./choose-avatar.component.css']
})
export class ChooseAvatarComponent implements OnInit, OnDestroy {

  public formG: FormGroup;
  public isSubmitting$: Observable<boolean>;
  public userInitial: Observable<string>;
  public imgPath: any | null | string;
  public avatar: string | ArrayBuffer;
  private candidateSubscription: Subscription;
  private candidate: UserInterface;


  constructor(private formBuilder: FormBuilder, private store: Store) {
  }

  public ngOnInit(): void {
    this.initForm();
    this.initValues();
  }

  public initForm(): void {
    this.formG = this.formBuilder.group({
      userAvatar: [''],
    })
  }


  public openUploadAvatar(avatar: HTMLElement): void {
    avatar.click()
  }


  public uploadAvatar(target) {

    if (target.files.length === 0)
      return;
    let reader = new FileReader();
    reader.readAsDataURL(target.files[0]);
    reader.onload = (_event: ProgressEvent<FileReader>) => {
      this.avatar = reader.result;
    }
    this.store.dispatch(AddUserAvatarAction(this.formG.value));
    console.log(this.formG.value)
  }

  private initValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.candidateSubscription = this.store.pipe(select(UserSelector)).subscribe((v) => this.candidate = v)
    this.userInitial = this.store.pipe(select(UserInitialSelector)).pipe(
      map(({firstname, lastname}) => {
        if (firstname && lastname) {
          return firstname.charAt(0) + lastname.charAt(0)
        }
        return ''
      })
    )
  }

  public onSubmit(): void {
 //   console.log(this.formG.value)

  //  console.log({candidate: this.candidate})
      this.store.dispatch(SignUpAction({candidate: this.candidate}));
  }


  public ngOnDestroy(): void {
    this.candidateSubscription.unsubscribe()
  }

 public backToPhoneStep():void {
   this.store.dispatch(PrevStepAction());
 }
}
