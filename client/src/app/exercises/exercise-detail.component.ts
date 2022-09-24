import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationHistoryService } from '../shared/navigation-history.service';
import { ReadyToRunDTOs } from '@shared/model/ReadyToRunDTOs';
import { Subscription } from 'rxjs';
import { ExercisesService } from 'app/services/exercises.service';

@Component({
  selector: 'rtr-exercise-detail',
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.css']
})
export class ExerciseDetailComponent implements OnInit, OnDestroy {

  private subscription$ : Subscription = new Subscription();
  exerciseSteps: ReadyToRunDTOs.IExerciseSteps | null = null;
  exercise: ReadyToRunDTOs.IExercise | null= null;

  constructor(
    private route: ActivatedRoute,
    private navHistory: NavigationHistoryService,
    private exercisesService: ExercisesService
    ) {
    console.log('ExerciseDetailComponent constructed!');
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    let id = param ? +param : 0;
    console.log('exercise details for id = ' + id);

    this.subscription$.add(
      //this.exercisesService.getExerciseDetailLong(id).subscribe(
      this.exercisesService.getExerciseDetail(id).subscribe(
        (exercise) => {
          console.log('getExerciseDetail for exercise id \'' + id + '\' = ', exercise);
          if (exercise != null) {
            this.exercise = exercise;
          }
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    //throw Error('You cannot destroy me!');
  }

  accordionId(): string {
    return 'stepsAccordionExercise' + this.exercise?.id;
  }

  onBack(): void {
    this.navHistory.goBack();
  }
}
