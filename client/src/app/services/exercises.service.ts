import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReadyToRunDTOs } from "@shared/model/ReadyToRunDTOs";
import { BehaviorSubject, catchError, EMPTY, Observable, of, switchMap, tap } from "rxjs";
import { ExerciseStepsService } from "./exercise-steps.service";
import { StepsService } from "./steps.service";

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {
  private readonly exercisesSummaryUrl = 'webui/exercises'; // for retrieval of all exercises (summary level detail)
  private readonly exerciseBaseUrl = 'webui/exercise'; // for retrieval of specific exercise (summary or detailed)
  private exerciseStore: { exercises: ReadyToRunDTOs.IExercise[] } = { exercises: [] };

  private _exercises: BehaviorSubject<ReadyToRunDTOs.IExercise[] | null> = <BehaviorSubject<ReadyToRunDTOs.IExercise[] | null>>new BehaviorSubject(null);
  get exercises() {
    return this._exercises.asObservable();
  }

  constructor(
    private http: HttpClient,
    private exerciseStepsIdsService: ExerciseStepsService,
    private stepsService: StepsService
  ) {
    // Fetch initial data from the server, process it to set up the main store.
    // subscription$ combine latest here to accept steps from seperate call?
    this.http.get<ReadyToRunDTOs.IAllExercises>(this.exercisesSummaryUrl).subscribe(
      (allExercises) => {
        this.initialiseExercisesData(allExercises);
      }
    );
  }

  public getExerciseSummary(id: number): Observable<ReadyToRunDTOs.IExercise | null> {
    if (this.exerciseStore.exercises) {
      const foundItem = this.exerciseStore.exercises.find(e => e.id === id);
      if (foundItem) {
        return of(foundItem);
      }
    }

    const url = `${this.exerciseBaseUrl}/summary/${id}`;
    return this.http.get<ReadyToRunDTOs.IExercise>(url)
      .pipe(
        tap(data => console.log('getExerciseSummary: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  /**
   * Method retrieves detailed data on exercise, bascially the summary detail
   * with the addition of all step data.
   * @param id
   * @returns
   */
  public getExerciseDetail(id: number): Observable<ReadyToRunDTOs.IExercise | null> { // not sure we need the | null, need to investigate error handling

    const url = `${this.exerciseBaseUrl}/detail/${id}`;

    return this.http.get<ReadyToRunDTOs.IExercise>(url)
      .pipe(
        tap(data => console.log('getExerciseDetail: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  /**
   * Method assembles detailed exercise data (summary + steps) by calling 3 server apis to retireve the necessary info.
   * Leaving in as an example of chaning asynchronous calls with observables, may come in handy at some point
   * @param exerciseId
   * @returns
   */
  public getExerciseDetailLong(exerciseId: number): Observable<ReadyToRunDTOs.IExercise | null> {

    return this.getExerciseSummary(exerciseId)
      .pipe(
        switchMap(exercise => {
          if (exercise != null) {
            return this.loadExerciseSteps(exercise);
          }

          return EMPTY;
        })
      );
  }

  private loadExerciseSteps(exercise: ReadyToRunDTOs.IExercise): Observable<ReadyToRunDTOs.IExercise> {
    return this.exerciseStepsIdsService.getExerciseSteps(exercise.id)
      .pipe(
        switchMap(exerciseSteps => {
          return this.addExerciseSteps(exercise, exerciseSteps);
        })
      );
  }

  private addExerciseSteps(
    exercise: ReadyToRunDTOs.IExercise,
    stepIds: ReadyToRunDTOs.IExerciseSteps): Observable<ReadyToRunDTOs.IExercise> {

    return this.stepsService.getSteps(stepIds.stepIds)
      .pipe(
        switchMap(steps => {
          exercise.steps = JSON.parse(JSON.stringify(steps));
          return of(exercise);
        })
      );
  }

  private initialiseExercisesData(allExercises: ReadyToRunDTOs.IAllExercises) {
    console.log("initaliseExercisesData : processing allExercies = ", allExercises);
    if (allExercises == null || allExercises.exercises == null) {
      return;
    }

    // TODO - look at deepCopy
    this.exerciseStore.exercises = JSON.parse(JSON.stringify(allExercises.exercises));

    this.publishAllExercises();
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;

    if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `An error occurred: ${err.error.message}`;
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMessage = `Backend returned code ${err.status}, body was: ${err.error}`;
    }
    console.error(errorMessage);

    return EMPTY;
  }

  /// Event publishing
  private publishAllExercises() {
    const exercises = JSON.parse(JSON.stringify(this.exerciseStore.exercises));
    this._exercises.next(exercises);
  }
}

