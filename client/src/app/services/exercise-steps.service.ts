import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, EMPTY, Observable, tap } from "rxjs";

import { ReadyToRunDTOs } from "@shared/model/ReadyToRunDTOs";

@Injectable({
  providedIn: 'root'
})
export class ExerciseStepsService {
  private readonly exerciseStepsBaseUrl = 'webui/exercisesteps';

  constructor(
    private http: HttpClient
  ) {}

  getExerciseSteps(exerciseId: number): Observable<ReadyToRunDTOs.IExerciseSteps> {
    const url = `${this.exerciseStepsBaseUrl}/${exerciseId}`;

    return this.http.get<ReadyToRunDTOs.IExerciseSteps>(url)
      .pipe(
        tap(data => console.log('getExerciseSteps: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
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
}
