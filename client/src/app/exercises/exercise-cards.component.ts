import { Component, OnInit } from '@angular/core';
import { NavigationHistoryService } from '../shared/navigation-history.service';
import { ReadyToRunDTOs } from '@shared/model/ReadyToRunDTOs';

@Component({
  selector: 'rtr-exercise-cards',
  templateUrl: './exercise-cards.component.html',
  styleUrls: ['./exercise-cards.component.css']
})
export class ExerciseCardsComponent implements OnInit {
  exercises: ReadyToRunDTOs.IExercise[] = [
    {
      id: 1,
      title: 'Basic Squat',
      introduction: undefined,
      steps: []
    },
    {
      id: 2,
      title: 'Skipping',
      introduction: undefined,
      steps: []
    },
    {
      id: 3,
      title: 'Couch Stretch',
      introduction: "The couch stretch is a weapons-grade technique to "+
        "open up the hip and open up some slack upstream of the knee.",
      steps: []
    }
  ];

  constructor(private navHistory: NavigationHistoryService) { }

  ngOnInit(): void {
  }

  onBack(): void {
    this.navHistory.goBack();
  }
}
