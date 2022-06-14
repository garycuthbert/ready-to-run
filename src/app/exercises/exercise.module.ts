import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseListComponent } from './exercise-list.component';
import { ExerciseShellComponent } from './exercise-shell.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ExerciseCardsComponent } from './exercise-cards.component';
import { ExerciseCardComponent } from './exercise-card.component';



@NgModule({
  declarations: [
    ExerciseListComponent,
    ExerciseShellComponent,
    ExerciseCardsComponent,
    ExerciseCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ExerciseModule { }
