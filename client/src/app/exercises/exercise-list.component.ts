import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AllStandardsStandard, IStandard } from '../standards/standard';
import { StandardService } from '../standards/standard.service';
import { ExerciseService } from './exercise.service';

@Component({
  selector: 'rtr-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit, OnDestroy {
  errorMessage!: string;
  standards: IStandard[] = [ AllStandardsStandard ];
  selectedStandard!: IStandard | null;
  sub!: Subscription;
  //excerises: IExercise[] | undefined;

  constructor(private standardService: StandardService,
              private exerciseService: ExerciseService) { }

  ngOnInit(): void {

    this.sub = this.standardService.selectedStandardChanges$.subscribe(
      selectedStandard => this.selectedStandard = selectedStandard
    );

    this.standardService.getStandards().subscribe({
      next: (standards: IStandard[]) => {
        this.standards = this.standards.concat(standards);
      },
      error: err => this.errorMessage = err
    });
  }

  onSelected(standard: IStandard) : void {
    if (standard?.id === AllStandardsStandard.id) {
      // Keep the 'All' assignment local to this component
      this.selectedStandard = standard;
    }
    else {
      this.standardService.changeSelectedStandard(standard);
    }
  }

  getStandardText(standard: IStandard): string {
    if (standard?.id === AllStandardsStandard.id) {
      return standard.title;
    }

    return '' + standard.number;
  }

  getStandardTooltip(standard: IStandard): string {
    if (standard?.id === AllStandardsStandard.id) {
      return 'All Standards';
    }

    return standard.title;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
