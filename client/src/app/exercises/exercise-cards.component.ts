import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationHistoryService } from '../shared/navigation-history.service';
import { ReadyToRunDTOs } from '@shared/model/ReadyToRunDTOs';
import { ExercisesService } from 'app/services/exercises.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'rtr-exercise-cards',
  templateUrl: './exercise-cards.component.html',
  styleUrls: ['./exercise-cards.component.css']
})
export class ExerciseCardsComponent implements OnInit, OnDestroy {

  //exerciseList = new Array<ReadyToRunDTOs.IExercise>();
  exerciseList : ReadyToRunDTOs.IExercise[] = [];

  private subscriptions$: Subscription = new Subscription();

  constructor(
    private navHistory: NavigationHistoryService,
    private excerciseService: ExercisesService
    ) {
  }

  ngOnInit(): void {
    this.subscriptions$.add(
      this.excerciseService.exercises.subscribe(
        exercises => {
          //console.log('ngOnInit subscribe! got exercises', this.exerciseList);
          if (this.exerciseList?.length > 0) { // for some reason without the ?. cehck lenght is reported as null here, look like something in the observable stack as the array is good
            this.exerciseList.splice(0, this.exerciseList.length);
          }

          this.exerciseList = JSON.parse(JSON.stringify(exercises));
        }
      ));
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

  onBack(): void {
    this.navHistory.goBack();
  }
}
