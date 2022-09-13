import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AllStandardsStandard } from '../standards/standard';
import { ReadyToRunDTOs } from '@shared/model/ReadyToRunDTOs';
import { StandardsService } from 'app/services/standards.service';
//import { ExerciseService } from './exercise.service';
import { ExercisesService } from 'app/services/exercises.service';

@Component({
  selector: 'rtr-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit, OnDestroy {
  errorMessage!: string;
  standards: ReadyToRunDTOs.IStandard[] = [ AllStandardsStandard ];
  selectedStandard!: ReadyToRunDTOs.IStandard | null;
  subscriptions$: Subscription = new Subscription();
  //excerises: IExercise[] | undefined;

  constructor(private standardsService: StandardsService,
              private exercisesService: ExercisesService) { }

  ngOnInit(): void {
    this.subscriptions$.add(
      this.standardsService.selectedStandard.subscribe(
        (standard) => {
          this.selectedStandard = standard;
        })
    );

    this.subscriptions$.add(
      this.standardsService.standards.subscribe({
        next: (standards: ReadyToRunDTOs.IStandard[] | null) => {
          this.standards = this.standards.concat(standards ?? []);
        },
        error: (err : any) => this.errorMessage = err
      })
    );
  }

  onSelected(standard: ReadyToRunDTOs.IStandard) : void {
    if (standard?.id === AllStandardsStandard.id) {
      // Keep the 'All' assignment local to this component
      this.selectedStandard = standard;
    }
    else {
      this.standardsService.changeSelectedStandard(standard);
    }
  }

  getStandardText(standard: ReadyToRunDTOs.IStandard): string {
    if (standard?.id === AllStandardsStandard.id) {
      return standard.title;
    }

    return '' + standard.number;
  }

  getStandardTooltip(standard: ReadyToRunDTOs.IStandard): string {
    if (standard?.id === AllStandardsStandard.id) {
      return 'All Standards';
    }

    return standard.title;
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
