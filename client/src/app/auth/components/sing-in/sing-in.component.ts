import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent implements OnInit {
  public formG: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.initForm()
  }

  public initForm() {
    this.formG = this.formBuilder.group({
      email: ['', Validators.required,Validators.email],
      password: ['', Validators.required,],
    })
  }

  public onSubmit():void{
    // console.log(this.formG.value)
    // console.log(this.formG.valid)
  }
}
