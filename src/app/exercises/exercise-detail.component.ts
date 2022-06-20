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
      },
      {
        id: 3,
        imagePath: '/assets/images/couchStretch/step3.png',
        paragraphs: [
          "Draw up your right leg and position it in front of you, with " +
          "your shin vertical."
        ]
      },
      {
        id: 4,
        imagePath: '/assets/images/couchStretch/step4.png',
        paragraphs: [
          "With your butt squeezed, drive the front of your hip toward the " +
          "ground. Maintain this position for at least one minute"
        ]
      },
      {
        id: 5,
        imagePath: '/assets/images/couchStretch/step5.png',
        paragraphs: [
          "Really crank up you hip flexor by lifting your torso (with " +
          "your glutes still engaged) and hold for another minute."
        ]
      },
      {
        id: 6,
        imagePath: '/assets/images/couchStretch/step6.png',
        paragraphs: [
          "Drive your torso upright with your glutes and abdominals " +
          "engaged."
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
