import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StepComponent } from './step.component';

@NgModule({
  declarations: [
    StepComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  exports: [
    StepComponent
  ]
})
export class StepModule { }
