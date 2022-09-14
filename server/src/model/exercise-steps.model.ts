import { ReadyToRunDTOs } from '@shared/model/ReadyToRunDTOs';
import exerciseStepsJSON from '../assets/mock/exerciseSteps.json';

export class ExerciseStepsModel {
    private exerciseSteps = <ReadyToRunDTOs.IExerciseSteps[]>exerciseStepsJSON;

    public getExerciseSteps(exerciseId: number) : ReadyToRunDTOs.IExerciseSteps {
        const exercise = this.exerciseSteps.find(es => es.exerciseId === exerciseId);

        return exercise ?? { exerciseId: exerciseId, stepIds: [] } as ReadyToRunDTOs.IExerciseSteps;    
    }
}