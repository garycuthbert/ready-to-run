import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandardDetailComponent } from './standard-detail.component';
import { StandardSummaryListComponent } from './standard-summary-list.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    StandardDetailComponent,
    StandardSummaryListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'standards',
        children: [
          { path: '', component: StandardSummaryListComponent },
          { path: ':id', component: StandardDetailComponent }
        ]
      }
    ])
  ]
})
export class StandardsModule { }
