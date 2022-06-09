import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IStandard } from './standard';

@Injectable({
  providedIn: 'root'
})
export class StandardService {
  private standardsUrl = 'api/standards';
  private standards: IStandard[] | undefined;

  constructor(private http: HttpClient) { }

  getStandards(): Observable<IStandard[]> {
    if (this.standards) {
      return of(this.standards);
    }

    return this.http.get<IStandard[]>(this.standardsUrl)
        .pipe(
          tap(data => console.log('All Standards', JSON.stringify(data))),
          tap(data => this.standards = data),
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
