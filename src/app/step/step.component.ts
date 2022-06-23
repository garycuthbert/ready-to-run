import { Component, Input, OnInit } from '@angular/core';
import { IStep } from './step';

@Component({
  selector: 'rtr-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit {

  missing: string = "Step Component has no step data to display!";
  @Input() step!: IStep;

  imagePath: string = '/assets/images/couchStretch/step5.png';
  constructor() { }

  ngOnInit(): void {
  }

}
