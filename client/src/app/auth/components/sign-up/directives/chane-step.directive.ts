import {Directive, ElementRef, OnInit, Input, HostListener} from '@angular/core';
import {Store} from "@ngrx/store";
import {NextStepAction, PrevStepAction} from "../../../store/action-creators/step.action";


@Directive({
  selector: '[nextStep], [prevStep] '
})
export class ChaneStepDirective implements OnInit {


  @Input('nextStep')
  public next;
  @Input('prevStep')
  public prev;

  constructor(
    private store: Store,
    private el: ElementRef<HTMLButtonElement>
  ) {
  }

  public ngOnInit(): void {

  }

  @HostListener('click', ['$event'])
  listen(e) {
    this.initMethod();
  }


  private initMethod() {
    if ('next' in this) {
      this.store.dispatch(NextStepAction());
    }
    if ('prev' in this) {
      this.store.dispatch(PrevStepAction());
    }

  }

}
