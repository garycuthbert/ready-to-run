import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReadyToRunDTOs } from "@shared/model/ReadyToRunDTOs";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {
  private readonly exercisesUrl = 'webui/exercises';
  private exercisesStore: { exercises: ReadyToRunDTOs.IExercise[] } = { exercises: [] };

  private _exercises: BehaviorSubject<ReadyToRunDTOs.IExercise[] | null> = <BehaviorSubject<ReadyToRunDTOs.IExercise[] | null>>new BehaviorSubject(null);
  get exercises() {
    return this._exercises.asObservable();
  }

  constructor(
    private http: HttpClient
  ) {
    // Fetch initial data from the server, process it to set up the main store.
    // subscription$ combine latest here to accept steps from seperate call?
    this.http.get<ReadyToRunDTOs.IAllExercises>(this.exercisesUrl).subscribe(
      (allExercises) => {
        this.initialiseExercisesData(allExercises);
      }
    );
  }

  private initialiseExercisesData(allExercises: ReadyToRunDTOs.IAllExercises) {
    console.log("initaliseExercisesData : processing allExercies = ", allExercises);
    if (allExercises == null || allExercises.exercises == null) {
      return;
    }

    // TODO - look at deepCopy
    this.exercisesStore.exercises = JSON.parse(JSON.stringify(allExercises.exercises));

    this.publishAllExercises();
  }

  /// Event publishing
  private publishAllExercises() {
    const exercises = JSON.parse(JSON.stringify(this.exercisesStore.exercises));
    this._exercises.next(exercises);
  }
}
