import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AllStandardsStandard } from '../standards/standard';
import { ReadyToRunDTOs } from '@shared/model/ReadyToRunDTOs';
import { StandardService } from '../standards/standard.service';
import { ExerciseService } from './exercise.service';

@Component({
  selector: 'rtr-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit, OnDestroy {
  errorMessage!: string;
  standards: ReadyToRunDTOs.IStandard[] = [ AllStandardsStandard ];
  selectedStandard!: ReadyToRunDTOs.IStandard | null;
  sub!: Subscription;
  //excerises: IExercise[] | undefined;

  constructor(private standardService: StandardService,
              private exerciseService: ExerciseService) { }

  ngOnInit(): void {

    this.sub = this.standardService.selectedStandardChanges$.subscribe(
      selectedStandard => this.selectedStandard = selectedStandard
    );

    this.standardService.getStandards().subscribe({
      next: (standards: ReadyToRunDTOs.IStandard[]) => {
        this.standards = this.standards.concat(standards);
      },
      error: err => this.errorMessage = err
    });
  }

  onSelected(standard: ReadyToRunDTOs.IStandard) : void {
    if (standard?.id === AllStandardsStandard.id) {
      // Keep the 'All' assignment local to this component
      this.selectedStandard = standard;
    }
    else {
      this.standardService.changeSelectedStandard(standard);
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
    this.sub.unsubscribe();
  }
}
