import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadyRatingComponent } from './ready-rating.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ReadyRatingComponent
  ],
  exports: [
    ReadyRatingComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
