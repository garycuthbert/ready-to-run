import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IStandard } from './standard';
import { StandardService } from './standard.service';

@Component({
  selector: 'rtr-standard-summary-list',
  templateUrl: './standard-summary-list.component.html',
  styleUrls: ['./standard-summary-list.component.css']
})
export class StandardSummaryListComponent implements OnInit, OnDestroy {
  pageTitle = 'Standards Overview';
  loginMessage = 'Login to track your progress!';
  errorMessage: string = '';
  standards: IStandard[] | undefined;
  selectedStandard!: IStandard | null;
  sub!: Subscription;

  constructor(private standardService: StandardService) { }

  ngOnInit(): void {

    this.sub = this.standardService.selectedStandardChanges$.subscribe(
      selectedStandard => this.selectedStandard = selectedStandard
    );

    this.standardService.getStandards().subscribe({
      next: (standards: IStandard[]) => { this.standards = standards },
      error: err => this.errorMessage = err
    });
  }

  onSelectedStandard(standard: IStandard) : void {
      this.standardService.changeSelectedStandard(standard);
  }

  onToggleSelectedStandard(standard: IStandard) : void {

    if (standard.id == this.selectedStandard?.id) {
      this.standardService.changeSelectedStandard(null);
    }
    else {
      this.standardService.changeSelectedStandard(standard);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
