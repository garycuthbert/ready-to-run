import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IStandard } from './standard';
import { StandardService } from './standard.service';

@Component({
  selector: 'rtr-standard-detail-shell',
  templateUrl: './standard-detail-shell.component.html',
  styleUrls: ['./standard-detail-shell.component.css']
})
export class StandardDetailShellComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Standard: ';
  standard!: IStandard | null;
  sub!: Subscription;

  constructor(private standardService: StandardService) { }

  ngOnInit(): void {
    this.sub = this.standardService.selectedStandardChanges$.subscribe(
      selectedStandard => this.standard = selectedStandard
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
