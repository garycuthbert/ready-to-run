import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseListComponent } from './exercise-list.component';
import { ExerciseShellComponent } from './exercise-shell.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ExerciseListComponent,
    ExerciseShellComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ExerciseModule { }
