import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandardListComponent } from './standard-list.component';
import { StandardShellComponent } from './standard-shell.component';
import { StandardDetailShellComponent } from './standard-detail-shell.component';
import { StandardSummaryListComponent } from './standard-summary-list.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    StandardListComponent,
    StandardShellComponent,
    StandardDetailShellComponent,
    StandardSummaryListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    // RouterModule.forChild([
    //   { path: 'summary', component: StandardListComponent },
    //   { path: 'standards', component: StandardShellComponent }
    //   // { path: '/exercises', component: }
    // ])
  ]
})
export class StandardsModule { }
