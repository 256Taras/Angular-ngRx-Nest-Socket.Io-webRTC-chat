import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'am-progress-step',
  templateUrl: './step-container.component.html',
  styleUrls: ['./step-container.component.css']
})
export class StepContainerComponent implements OnInit {


  public stepIndex: number = 0;

  @HostBinding('class.activeStep')
  public isActive = false;

  public status:string="";
  public help:string;

   @Input()
  public set activeState(step) {
     console.log(this.stepIndex)
    this.isActive = step === this;
  }

  constructor() {
  }

  ngOnInit(): void {

  }

}
