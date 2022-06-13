import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IExercise } from '../exercises/exercise';
import { ExerciseService } from '../exercises/exercise.service';
import { IStandard } from './standard';
import { StandardService } from './standard.service';

@Component({
  selector: 'rtr-standard-list',
  templateUrl: './standard-list.component.html',
  styleUrls: ['./standard-list.component.css']
})
export class StandardListComponent implements OnInit, OnDestroy {
  pageTitle = 'Standards List';
  errorMessage!: string;
  standards!: IStandard[];
  selectedStandard!: IStandard | null;
  sub!: Subscription;
  excerises: IExercise[] | undefined;

  constructor(private standardService: StandardService,
              private exerciseService: ExerciseService) { }

  ngOnInit(): void {

    this.sub = this.standardService.selectedStandardChanges$.subscribe(
      selectedStandard => this.selectedStandard = selectedStandard
    );

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

  onSelected(standard: IStandard) : void {
    this.standardService.changeSelectedStandard(standard);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
