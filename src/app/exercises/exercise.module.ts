import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseListComponent } from './exercise-list.component';
import { ExerciseShellComponent } from './exercise-shell.component';
import { ExerciseCardsComponent } from './exercise-cards.component';
import { ExerciseCardComponent } from './exercise-card.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ExerciseListComponent,
    ExerciseShellComponent,
    ExerciseCardsComponent,
    ExerciseCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'exercises',
        children: [
          { path: '', component: ExerciseShellComponent }
        ]
      }
    ])
  ]
})
export class ExerciseModule { }
