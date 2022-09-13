import { Component, Input, OnInit } from '@angular/core';
import { ReadyToRunDTOs } from '@shared/model/ReadyToRunDTOs';

@Component({
  selector: 'rtr-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit {

  missing: string = "Step Component has no step data to display!";
  @Input() step!: ReadyToRunDTOs.IStep;

  imagePath: string = '/assets/images/couchStretch/step5.png';
  constructor() { }

  ngOnInit(): void {
  }

}
