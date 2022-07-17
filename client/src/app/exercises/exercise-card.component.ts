import { Component, Input, OnInit } from '@angular/core';
import { IExercise } from './exercise';

@Component({
  selector: 'rtr-exercise-card',
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.css']
})
export class ExerciseCardComponent implements OnInit {
  @Input() exercise: IExercise | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
