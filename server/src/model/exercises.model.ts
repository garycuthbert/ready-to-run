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

  public getExerciseSummary(id: number): Promise<ReadyToRunDTOs.IExercise> {
    const ret = new Promise<ReadyToRunDTOs.IExercise>((resolve, reject) => {
      const exercise = this.exercises?.find((e) => e.id === id);
      if (exercise != null) {
        resolve(exercise);
      }
      else {
        reject(exercise);
      }
    });

    return ret;
  }

  public getExerciseDetail(id: number): Promise<ReadyToRunDTOs.IExercise> {
    const ret = new Promise<ReadyToRunDTOs.IExercise>((resolve, reject) => {
      let exercise = this.exercises?.find((e) => e.id === id);
      
      let err = { ...this.error };
      err.message = "System Error: Exercise details (id = " + id + ") are not available on the server.";

      if (exercise == null) {        
        reject(err);
      } 

      this.exerciseSteps.getExerciseSteps(id)
      .then((steps) => {
        if (steps.stepIds.length < 1) {
          if (exercise == null) {
            // typescript limitation? we have already established that exercies is not null
            reject(err);
          }
          else {
            // this exercise has no steps, still valid
            resolve(exercise);
          }           
        }      
      
        this.steps.getSteps(steps.stepIds)
        .then((stepsDetail) => {
          if (exercise == null) {
            // typescript limitation? we have already established that exercies is not null
            reject(err);
          }
          else {
            if (stepsDetail.length > 0) {
              // Add the steps to the exercise object for return
              exercise.steps = JSON.parse(JSON.stringify(stepsDetail));
            }

            resolve(exercise);
          }          
        })
        .catch((error) => {
          reject(error);
        });
      })
      .catch((error) => {
        reject(error);
      });
    });

    return ret;
  }
}
