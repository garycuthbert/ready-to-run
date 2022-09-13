import { ReadyToRunDTOs } from "@shared/model/ReadyToRunDTOs";

// App imports
import exercisesJSON from '../assets/mock/exercises.json';
import stepsJSON from '../assets/mock/steps.json';

export class ExercisesModel {
    private exercises = <ReadyToRunDTOs.IAllExercises>exercisesJSON;

    constructor() {}

    public getAllExercises() {
        return this.exercises;
    }

    public getExercise(id: number): ReadyToRunDTOs.IExercise | null {
        const exercise = this.exercises.exercises?.find(e => e.id === id);
        return exercise ?? null;
    }
}