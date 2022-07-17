import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { EMPTY, Subscription } from 'rxjs';
import { NavigationHistoryService } from '../shared/navigation-history.service';
import { IStandard } from './standard';
import { StandardService } from './standard.service';

@Component({
  selector: 'rtr-standard-detail',
  templateUrl: './standard-detail.component.html',
  styleUrls: ['./standard-detail.component.css']
})
export class StandardDetailComponent implements OnInit {
  pageTitle: string = 'Standard: ';
  standard!: IStandard | null;
  errorMessage: string = '';

  constructor(private standardService: StandardService,
              private navigationService: NavigationHistoryService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    let id = param ? +param:0;
    //let id = +this.route?.snapshot?.paramMap.get('id');
    //if (null == id)
//      id = 0;

    this.getStandard(id);
    // this.sub = this.standardService.selectedStandardChanges$.subscribe(
    //   selectedStandard => this.standard = selectedStandard
    // );
  }

  getStandard(id: number): void {
    this.standardService.getStandard(id).subscribe({
      next: standard => this.onStandardRetrieved(standard),
      error: err => this.errorMessage = err
    });
  }

  onStandardRetrieved(standard: IStandard): void {
    this.standard = standard;

    if (this.standard) {
      this.pageTitle = `Standard: ${this.standard.title}`;
    } else {
      this.pageTitle = 'Standard not found!';
    }
  }

  onBack(): void {
    this.navigationService.goBack();
  }
}
