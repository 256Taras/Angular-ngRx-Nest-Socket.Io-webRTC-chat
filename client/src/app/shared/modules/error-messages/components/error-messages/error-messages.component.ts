import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'am-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.css']
})
export class ErrorMessagesComponent implements OnInit {

  @Input('errorMessages')
  errorMessageProps: string;


  constructor() {

  }

  public ngOnInit(): void {
    console.log(this.errorMessageProps)
  }

}
