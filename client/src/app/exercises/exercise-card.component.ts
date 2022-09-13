import { Component, Input, OnInit } from '@angular/core';
import { ReadyToRunDTOs } from '@shared/model/ReadyToRunDTOs';

@Component({
  selector: 'rtr-exercise-card',
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.css']
})
export class ExerciseCardComponent implements OnInit {
  @Input() exercise: ReadyToRunDTOs.IExercise | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
