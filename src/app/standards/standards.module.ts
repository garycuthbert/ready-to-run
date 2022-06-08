import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandardListComponent } from './standard-list.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    StandardListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: StandardListComponent }
    ])
  ]
})
export class StandardsModule { }
