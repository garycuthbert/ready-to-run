import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IStandard } from '../standards/standard';
import { IExercise } from '../exercises/exercise';

export class FakedData implements InMemoryDbService {
  createDb() {
    const standards: IStandard[] = [
      {
        id: 1,
        title: "Neutral Feet",
        question: "Are your feet habitually in a neutral position?"
      },
      {
        id: 2,
        title: "Flat Shoes",
        question: "Do you wear flat shoes?"
      },
      {
        id: 3,
        title: "A Supple Thoracic Spine",
        question: "Do you have a pliant, properly organized thoracic spine?"
      },
      {
        id: 4,
        title: "An Efficient Squatting Technique",
        question: "Can you squat correctly?"
      },
      {
        id: 5,
        title: "Hip Flexion",
        question: "Can you stand on your left leg and express normal range " +
          "of hip flexion with your right hip for 30 seconds, then repeat " +
          "with your right leg and left hip?"
      },
      {
        id: 6,
        title: "Hip Extension",
        question: "Do you have a normal amount of hip extension?"
      },
      {
        id: 7,
        title: "Ankle Range Of Motion",
        question: "Do you have normal range of motion in your ankles?"
      },
      {
        id: 8,
        title: "Warming Up And Cooling Down",
        question: "Do you routinely perform pre-run warm-ups and post-run cool-downs?"
      },
      {
        id: 9,
        title: "Compression",
        question: "Are you wearing compression socks?"
      },
      {
        id: 10,
        title: "No Hotspots",
        question: "Are you free of hotspots of pain?"
      },
      {
        id: 11,
        title: "Hydration",
        question: "Are you hydrated?"
      },
      {
        id: 12,
        title: "Jumping And Landing",
        question: "Can you jump and land with good mechanics?"
      }
    ];

    const exercises: IExercise[] = [
      {
        id: 1,
        title: 'Basic Squat'
      },
      {
        id: 2,
        title: 'Skipping'
      }
    ];

    return { standards: standards, exercises: exercises };
  }
}
