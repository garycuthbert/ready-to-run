import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ReadyToRunDTOs } from '@shared/model/ReadyToRunDTOs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private exerciseUrl = 'api/exercises';
  private exercises: ReadyToRunDTOs.IExercise[] | undefined;

  constructor(private http: HttpClient) { }

  getExercises(): Observable<ReadyToRunDTOs.IExercise[]> {
    if (this.exercises) {
      return of(this.exercises);
    }

    return this.http.get<ReadyToRunDTOs.IExercise[]>(this.exerciseUrl)
      .pipe(
        tap(data => console.log('All Excercises', JSON.stringify(data))),
        tap(data => this.exercises = data),
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
    console.error(err);
    return EMPTY;
  }
}
