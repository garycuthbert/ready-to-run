import { ReadyToRunDTOs } from "@shared/model/ReadyToRunDTOs";

// App imports
import exercisesJSON from '../assets/mock/exercises.json';
import { ExerciseStepsModel } from "./exercise-steps.model";
import { StepsModel } from "./steps.model";

export class ExercisesModel {
    private exercises = <ReadyToRunDTOs.IExercise[]>exercisesJSON;

    private success : ReadyToRunDTOs.IInternalStatus = {
        code: 200,
        message: ''
    };
    private error : ReadyToRunDTOs.IInternalStatus = {
        code: 501,
        message: 'An Error!'
    };

    constructor(
        private exerciseSteps : ExerciseStepsModel,
        private steps : StepsModel
    ) {}

    public getAllExercises() {
        const dto: ReadyToRunDTOs.IAllExercisesDTO = { 
            status: this.success,
            exercises: this.exercises 
        }

        return dto;
    }

    public getAllExercisesIPromise() : Promise<ReadyToRunDTOs.IExercise[]> {
        const ret = new Promise<ReadyToRunDTOs.IExercise[]>((resolve, reject) => {
            //resolve(this.exercises);
            reject(this.error);
        });

        return ret;
    }

    public getExerciseSummary(id: number): ReadyToRunDTOs.IExercise | null {
        const exercise = this.exercises?.find(e => e.id === id);
        return exercise ?? null;
    }

    public getExerciseDetail(id: number) : ReadyToRunDTOs.IExercise | null {
        let exercise = this.getExerciseSummary(id);
        if (exercise == null) {
            throw Error('Exercise id \'' + id + '\' is invalid!');
            //return exercise; // invalid id passed
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