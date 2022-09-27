import { ReadyToRunDTOs } from '@shared/model/ReadyToRunDTOs';
import exerciseStepsJSON from '../assets/mock/exerciseSteps.json';

export class ExerciseStepsModel {
    private exerciseSteps = <ReadyToRunDTOs.IExerciseSteps[]>exerciseStepsJSON;

    public getExerciseSteps(exerciseId: number): Promise<ReadyToRunDTOs.IExerciseSteps> {
        const ret = new Promise<ReadyToRunDTOs.IExerciseSteps>((resolve, reject) => {
            let exercise = this.exerciseSteps.find(es => es.exerciseId === exerciseId);
            
            if (exercise == null) {
                // An exercise may not have any explanatory steps, just prepare an empty set for return
                exercise = { exerciseId: exerciseId, stepIds: [] } as ReadyToRunDTOs.IExerciseSteps;
            }

            resolve(exercise);
        });

        return ret;        
    }
}