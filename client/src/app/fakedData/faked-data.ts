import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ReadyToRunDTOs } from '@shared/model/ReadyToRunDTOs';

export class FakedData implements InMemoryDbService {
  createDb() {
    const standards: ReadyToRunDTOs.IStandard[] = [
      {
        id: 1,
        number: 1,
        title: "Neutral Feet",
        question: "Are your feet habitually in a neutral position?"
      },
      {
        id: 2,
        number: 2,
        title: "Flat Shoes",
        question: "Do you wear flat shoes?"
      },
      {
        id: 3,
        number: 3,
        title: "A Supple Thoracic Spine",
        question: "Do you have a pliant, properly organized thoracic spine?"
      },
      {
        id: 4,
        number: 4,
        title: "An Efficient Squatting Technique",
        question: "Can you squat correctly?"
      },
      {
        id: 5,
        number: 5,
        title: "Hip Flexion",
        question: "Can you stand on your left leg and express normal range " +
          "of hip flexion with your right hip for 30 seconds, then repeat " +
          "with your right leg and left hip?"
      },
      {
        id: 6,
        number: 6,
        title: "Hip Extension",
        question: "Do you have a normal amount of hip extension?"
      },
      {
        id: 7,
        number: 7,
        title: "Ankle Range Of Motion",
        question: "Do you have normal range of motion in your ankles?"
      },
      {
        id: 8,
        number: 8,
        title: "Warming Up And Cooling Down",
        question: "Do you routinely perform pre-run warm-ups and post-run cool-downs?"
      },
      {
        id: 9,
        number: 9,
        title: "Compression",
        question: "Are you wearing compression socks?"
      },
      {
        id: 10,
        number: 10,
        title: "No Hotspots",
        question: "Are you free of hotspots of pain?"
      },
      {
        id: 11,
        number: 11,
        title: "Hydration",
        question: "Are you hydrated?"
      },
      {
        id: 12,
        number: 12,
        title: "Jumping And Landing",
        question: "Can you jump and land with good mechanics?"
      }
    ];

    const exercises: ReadyToRunDTOs.IExercise[] = [
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

    const steps: ReadyToRunDTOs.IStep[] = [
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
    ];

    const exerciseSteps: { exerciseId: number, stepIds: number[] }[] = [
      {
        exerciseId: 1,
        stepIds: [1, 2, 3, 4, 5, 6]
      }
    ];

    return {
      standards: standards,
      exercises: exercises,
      steps: steps,
      exerciseSteps: exerciseSteps
    };
  }
}
