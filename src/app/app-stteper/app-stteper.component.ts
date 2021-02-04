import { Directionality } from '@angular/cdk/bidi';
import { CdkStepper } from '@angular/cdk/stepper';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-stteper',
  templateUrl: './app-stteper.component.html',
  styleUrls: ['./app-stteper.component.css'],
  providers: [{ provide: CdkStepper, useExisting: AppStteperComponent }]
})
export class AppStteperComponent extends CdkStepper implements OnInit{

  @Input() footerLabelStrings: Array<string>;
  @Input() activeStep: number;
  @Output() onStepChnaged: EventEmitter<number> = new EventEmitter<number>();



  constructor(dir: Directionality, cdr: ChangeDetectorRef ) {
    super(dir, cdr);
  }

  ngOnInit() {
    
  }

  stepChanged(e){
    this.onStepChnaged.emit(e);
  }

  ngOnChanges(){
    if(this.activeStep) {
        this.selectedIndex = this.activeStep;
    }
  }

  ngAfterViewInit(){
    this.selectedIndex = this.activeStep
  }
}
