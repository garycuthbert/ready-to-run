import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReadyToRunDTOs } from "@shared/model/ReadyToRunDTOs";
import { catchError, EMPTY, Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StepsService {
  private readonly stepsServiceBaseUrl = 'webui/steps';

  constructor(
    private http: HttpClient
    ) {}

  public getSteps(stepIds: number[]): Observable<ReadyToRunDTOs.IStep[]> {

    let idParams = '';
    stepIds?.forEach(id => {
      // if (idParams.length > 0) {
      //   idParams += '&';
      // }

      idParams += ((idParams.length > 0) ? '&' : '') +  `stepids=${id}`;
    });

    const url = `${this.stepsServiceBaseUrl}/${idParams}`;
    return this.http.get<ReadyToRunDTOs.IStep[]>(url)
      .pipe(
        tap(data => console.log('getSteps: ' + JSON.stringify(data))),
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
