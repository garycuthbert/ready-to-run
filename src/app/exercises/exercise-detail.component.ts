import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationHistoryService } from '../shared/navigation-history.service';
import { IExercise } from './exercise';

@Component({
  selector: 'rtr-exercise-detail',
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.css']
})
export class ExerciseDetailComponent implements OnInit {

  exercise: IExercise = {
    id: 1,
    title: 'Couch Stretch',
    introduction: "The couch stretch is a weapons-grade technique to "+
      "open up the hip and open up some slack upstream of the knee.",
    steps: [
      {
        id: 1,
        imagePath: '/assets/images/couchStretch/step1.png',
        paragraphs: [
          "Back your feet up against a wall, a box or the upper cushion " +
          "of you couch. If you are on a hard floor put down a cushion " +
          "for your knee."
        ]
      },
      {
        id: 2,
        imagePath: '/assets/images/couchStretch/step2.png',
        paragraphs: [
          "Slide your left leg so that your knee fits into the corner where " +
          "the floor meets the wall (or whatever corner you're using). Make " +
          "your shin flush with the wall and point your toe.",

          "IMPORTANT: Squeeze your glutes, in particular your left glute. " +
          "Keep squeezing throughout the mobilization. This will stabilize " +
          "your lower back and position your hip joint correctly"
        ]
      }
    ]
  }

  constructor(private route: ActivatedRoute,
              private navHistory: NavigationHistoryService) {
    console.log('ExerciseDetailComponent constructed!');
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    let id = param ? +param : 0;
    console.log('exercise details for id = ' + id);
  }

  accordionId(): string {
    return 'stepsAccordionExercise' + this.exercise.id;
  }

  onBack(): void {
    this.navHistory.goBack();
  }
}
