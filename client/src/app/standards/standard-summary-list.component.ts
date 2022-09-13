import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { ReadyToRunDTOs } from '@shared/model/ReadyToRunDTOs';
import { StandardsService } from 'app/services/standards.service';

@Component({
  selector: 'rtr-standard-summary-list',
  templateUrl: './standard-summary-list.component.html',
  styleUrls: ['./standard-summary-list.component.css']
})
export class StandardSummaryListComponent implements OnInit, OnDestroy {
  pageTitle = 'Standards Overview';
  loginMessage = 'Login to track your progress!';
  errorMessage: string = '';
  standards: ReadyToRunDTOs.IStandard[] | null = null;
  selectedStandard!: ReadyToRunDTOs.IStandard | null;
  subscriptions$: Subscription = new Subscription();
  readyRating: number = 5;

  constructor(private standardsService: StandardsService) { }

  ngOnInit(): void {
    this.subscriptions$.add(combineLatest([
      this.standardsService.standards
    ]).subscribe(results => { this.standards = results[0]; console.log('standard-summary-list.component : ngOnInit : results = ', results)}));

    this.subscriptions$.add(
      this.standardsService.selectedStandard.subscribe(
        (standard) => {
          this.selectedStandard = standard;
          console.log('selectedStandard changed! = ', this.selectedStandard);
        })
    );
  }

  onSelectedStandard(standard: ReadyToRunDTOs.IStandard) : void {
      this.standardsService.changeSelectedStandard(standard);
  }

  onToggleSelectedStandard(standard: ReadyToRunDTOs.IStandard) : void {

    if (standard.id == this.selectedStandard?.id) {
      this.standardsService.changeSelectedStandard(null);
    }
    else {
      this.standardsService.changeSelectedStandard(standard);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
