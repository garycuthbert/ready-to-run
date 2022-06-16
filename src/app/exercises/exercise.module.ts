import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseListComponent } from './exercise-list.component';
import { ExerciseShellComponent } from './exercise-shell.component';
import { ExerciseCardsComponent } from './exercise-cards.component';
import { ExerciseCardComponent } from './exercise-card.component';
import { RouterModule } from '@angular/router';
import { ExerciseDetailComponent } from './exercise-detail.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ExerciseListComponent,
    ExerciseShellComponent,
    ExerciseCardsComponent,
    ExerciseCardComponent,
    ExerciseDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'exercises',
        children: [
          { path: '', component: ExerciseShellComponent },
          { path: ':id', component: ExerciseDetailComponent }
        ]
      }
    ])
  ]
})
export class ExerciseModule { }
