import {AfterContentInit, Component, ContentChildren, OnInit, QueryList} from '@angular/core';
import {select, Store} from "@ngrx/store";

import {NextStepSelector, PrevStepSelector} from "../../../store/selectors/step.selector";
import {ClearStepStatus} from 'src/app/auth/store/action-creators/step.action';
import {Subscription} from 'rxjs';
import {StepContainerComponent} from "../step-container/step-container.component";


@Component({
  selector: 'am-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css'],

})
export class StepComponent implements OnInit, AfterContentInit {

  public activeIndex: number = 0;
  public itemLength: number;

  public isNext$: Subscription | boolean;
  public isPrev$: Subscription | boolean;

  @ContentChildren(StepContainerComponent)
  public steps: QueryList<StepContainerComponent>;


  constructor(private store: Store) {
  }

  public ngOnInit(): void {

    this.isNext$ = this.store.pipe(select(NextStepSelector)).subscribe((next:boolean) => {
   if (next){
     this.next()
     this.store.dispatch(ClearStepStatus())
   }

    })
    this.isPrev$ = this.store.pipe(select(PrevStepSelector)).subscribe((prev:boolean) => {
    if (prev){
      this.prev()
      this.store.dispatch(ClearStepStatus())
    }
    })
  }


  ngAfterContentInit() {
    this.initProgress(this.stepList.length);
    this.setActiveActiveStep(this.activeIndex);
    this.initStepIndex();
  }

  private next() {
    this.increaseStep();

  }

  private prev() {
    this.decreaseStep();

  }

  private increaseStep() {
    if (this.activeIndex < this.itemLength - 1) {
      this.activeIndex++;
      this.setActiveActiveStep(this.activeIndex);
    }
  }

  private decreaseStep() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
      this.setActiveActiveStep(this.activeIndex)
    }
  }


  private setActiveActiveStep(index: number): void {
    if (this.stepsExists) {
      this.removeActiveStep();
      this.updateActiveStep(index);
    }
  }

  private updateActiveStep(index) {
    this.stepList[index].activeState = this.stepList[index];
  }

  private removeActiveStep() {
    this.stepList.map((step: StepContainerComponent) => {
      if (step.isActive) {
        step.isActive = false;
      }
    });
  }

  private initStepIndex() {
    this.stepList.forEach((step: StepContainerComponent, i: number) => (step.stepIndex = i));
  }

  private get activeStep(): StepContainerComponent {
    return this.stepList[this.activeIndex];
  }

  private get stepsExists(): boolean {
    return this.stepList && Array.isArray(this.stepList);
  }

  private get stepList(): StepContainerComponent[] {
    return this.steps.toArray();
  }

  private initProgress(value): void {
    this.itemLength = value || this.stepList.length || 0;
  }


}
