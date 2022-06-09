import { Component, OnInit } from '@angular/core';
import { IExercise } from '../exercises/exercise';
import { ExerciseService } from '../exercises/exercise.service';
import { IStandard } from './standard';
import { StandardService } from './standard.service';

@Component({
  selector: 'app-standard-list',
  templateUrl: './standard-list.component.html',
  styleUrls: ['./standard-list.component.css']
})
export class StandardListComponent implements OnInit {
  pageTitle = 'Standards List';
  errorMessage: string = '';
  standards: IStandard[] | undefined;
  excerises: IExercise[] | undefined;

  constructor(private standardService: StandardService,
              private exerciseService: ExerciseService) { }

  ngOnInit(): void {
    this.standardService.getStandards().subscribe({
      next: (standards: IStandard[]) => {
        this.standards = standards;
      },
      error: err => this.errorMessage = err
    });

    this.exerciseService.getExercises().subscribe({
      next: (exercises: IExercise[]) => {
        this.excerises = exercises;
      },
      error: err => this.errorMessage = err
    });
  }

}
