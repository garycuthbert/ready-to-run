import { ReadyToRunDTOs } from "@shared/model/ReadyToRunDTOs";

// App imports
import exercisesJSON from '../assets/mock/exercises.json';
import stepsJSON from '../assets/mock/steps.json';
import { ExerciseStepsModel } from "./exercise-steps.model";
import { StepsModel } from "./steps.model";

export class ExercisesModel {
    private exercises = <ReadyToRunDTOs.IAllExercises>exercisesJSON;

    constructor(
        private exerciseSteps : ExerciseStepsModel,
        private steps : StepsModel
    ) {}

    public getAllExercises() {
        return this.exercises;
    }

    public getExerciseSummary(id: number): ReadyToRunDTOs.IExercise | null {
        const exercise = this.exercises.exercises?.find(e => e.id === id);
        return exercise ?? null;
    }

    public getExerciseDetail(id: number) : ReadyToRunDTOs.IExercise | null {
        let exercise = this.getExerciseSummary(id);
        if (exercise == null) {
            return exercise; // invalid id passed
        }

        const stepsLookup = this.exerciseSteps.getExerciseSteps(id);
        if (stepsLookup.stepIds.length < 1) {
            return exercise; // this exercise has not steps
        }

        const stepsDetail = this.steps.getSteps(stepsLookup.stepIds);
        if (stepsDetail.length > 0) {
            exercise.steps = JSON.parse(JSON.stringify(stepsDetail));
        }

        return exercise;
    }
}