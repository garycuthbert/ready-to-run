import { ReadyToRunDTOs } from "@shared/model/ReadyToRunDTOs";

// App imports
import exercisesJSON from "../assets/mock/exercises.json";
import { ExerciseStepsModel } from "./exercise-steps.model";
import { StepsModel } from "./steps.model";

export class ExercisesModel {
  private exercises = <ReadyToRunDTOs.IExercise[]>exercisesJSON;

    private success : ReadyToRunDTOs.IInternalStatus = {
        code: 200,
        type: "None",
        message: ''
    };

    private error : ReadyToRunDTOs.IInternalStatus = {
    code: 501,
    type: "None",
    message: ''
    };

  private overrideError: ReadyToRunDTOs.IInternalStatus = {
    code: 503,
    type: "UseCode",
    message: "",
  };

  private redirectError: ReadyToRunDTOs.IInternalStatus = {
    code: 501,
    type: "Redirect",
    message: "",
  };

  constructor(
    private exerciseSteps: ExerciseStepsModel,
    private steps: StepsModel
  ) {}

  public getAllExercises(): Promise<ReadyToRunDTOs.IExercise[]> {
    const ret = new Promise<ReadyToRunDTOs.IExercise[]>((resolve, reject) => {
      if (this.exercises.length > 0) {
        // We have data to return
        resolve(this.exercises);
      } else {
        let err = { ...this.error };
        err.message =
          "System Error: Exercise data is not available on the server.";
        reject(err);
      }
    });

    return ret;
  }

  public getExerciseSummary(id: number): ReadyToRunDTOs.IExercise | null {
    const exercise = this.exercises?.find((e) => e.id === id);
    return exercise ?? null;
  }

  public getExerciseDetail(id: number): ReadyToRunDTOs.IExercise | null {
    let exercise = this.getExerciseSummary(id);
    if (exercise == null) {
      throw Error("Exercise id '" + id + "' is invalid!");
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
