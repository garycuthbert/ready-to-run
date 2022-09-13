import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { NavigationHistoryService } from '../shared/navigation-history.service';
import { ReadyToRunDTOs } from '@shared/model/ReadyToRunDTOs';
import { StandardsService } from 'app/services/standards.service';

@Component({
  selector: 'rtr-standard-detail',
  templateUrl: './standard-detail.component.html',
  styleUrls: ['./standard-detail.component.css']
})
export class StandardDetailComponent implements OnInit {
  pageTitle: string = 'Standard: ';
  standard!: ReadyToRunDTOs.IStandard | null;
  errorMessage: string = '';

  constructor(private standardsService: StandardsService,
              private navigationService: NavigationHistoryService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    let id = param ? +param:0;
    this.getStandard(id);
  }

  getStandard(id: number): void {
    this.standardsService.getStandard(id).subscribe({
      next: standard => this.onStandardRetrieved(standard),
      error: err => this.errorMessage = err
    });
  }

  onStandardRetrieved(standard: ReadyToRunDTOs.IStandard): void {
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
