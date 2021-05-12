import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/internal/Observable";
import {select, Store} from "@ngrx/store";
import {AddUserInitialsAction} from "../../../../store/action-creators/sign-up.action";
import {isSubmittingSelector} from "../../../../store/selectors/sign-up.selector";


@Component({
  selector: 'am-choose-avatar',
  templateUrl: './choose-avatar.component.html',
  styleUrls: ['./choose-avatar.component.css']
})
export class ChooseAvatarComponent implements OnInit {

  public formG: FormGroup;
  public isSubmitting$: Observable<boolean>;
  public imgPath: any | null | string;
  public avatar: string | ArrayBuffer;

  constructor(private formBuilder: FormBuilder, private store: Store) {
  }

  public ngOnInit(): void {
    this.initForm();
    this.initValues();
  }

  public initForm(): void {
    this.formG = this.formBuilder.group({
      userAvatar: ['',],
    })
  }

  public onSubmit(): void {

    if (this.formG.valid) {
      this.store.dispatch(AddUserInitialsAction(this.formG.value));

    }
    console.log(this.formG.value);
    console.log(this.formG.valid);
  }

  private initValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))

  }

  public openUploadAvatar(avatar: HTMLElement): void {
    avatar.click()
  }

  chooseColor(color: HTMLInputElement) {

    color.click()

  }


  uploadAvatar(target) {

    if (target.files.length === 0)
      return;
    let reader = new FileReader();
    reader.readAsDataURL(target.files[0]);
    reader.onload = (_event: ProgressEvent<FileReader>) => {
      this.avatar = reader.result;
    }
  }


}
