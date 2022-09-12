import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { ReadyToRunDTOs } from '@shared/model/ReadyToRunDTOs';
import { StandardService } from './standard.service';
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
  sub!: Subscription;
  subscriptions$: Subscription = new Subscription();
  readyRating: number = 5;

  constructor(
    private standardService: StandardService,
    private standardsService: StandardsService) { }

  ngOnInit(): void {

    this.sub = this.standardService.selectedStandardChanges$.subscribe(
      selectedStandard => this.selectedStandard = selectedStandard
    );

    // this.standardService.getStandards().subscribe({
    //   next: (standards: ReadyToRunDTOs.IStandard[]) => { this.standards = standards },
    //   error: err => this.errorMessage = err
    // });

    this.subscriptions$.add(combineLatest([
      this.standardsService.standards
    ]).subscribe(results => { this.standards = results[0]; console.log('standard-summary-list.component : ngOnInit : results = ', results)}));

    //this.subscriptions$.add(this.standardsService.selectedStandard).subscribe((value) => {});
  }

  onSelectedStandard(standard: ReadyToRunDTOs.IStandard) : void {
      this.standardService.changeSelectedStandard(standard);
  }

  onToggleSelectedStandard(standard: ReadyToRunDTOs.IStandard) : void {

    if (standard.id == this.selectedStandard?.id) {
      this.standardService.changeSelectedStandard(null);
    }
    else {
      this.standardService.changeSelectedStandard(standard);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.subscriptions$.unsubscribe();
  }
}
