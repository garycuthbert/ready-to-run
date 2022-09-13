import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, EMPTY, Observable, of, tap } from "rxjs";
import { ReadyToRunDTOs } from "@shared/model/ReadyToRunDTOs";

@Injectable({
  providedIn: 'root'
})
export class StandardsService {

  private readonly standardsUrl = 'webui/standards';
  private standardsStore: { standards: ReadyToRunDTOs.IStandard[] } = { standards: [] };

  private _standards: BehaviorSubject<ReadyToRunDTOs.IStandard[] | null> = <BehaviorSubject<ReadyToRunDTOs.IStandard[] | null>>new BehaviorSubject(null);
  get standards() {
    return this._standards.asObservable();
  }

  private _selectedStandardSource = new BehaviorSubject<ReadyToRunDTOs.IStandard | null>(null);
  get selectedStandard() {
    return this._selectedStandardSource.asObservable();
  }

  constructor(
    private http: HttpClient
  ) {
    // Fetch initial data from the server, process it to set up the main store.
    // Subscribe to external notifications which will
    this.http.get<ReadyToRunDTOs.IAllStandards>(this.standardsUrl).subscribe(
      (allStandards) => {
        this.initialiseStandardsData(allStandards);
      }
    );
  }

  changeSelectedStandard(selectedStandard: ReadyToRunDTOs.IStandard | null) : void {
    this._selectedStandardSource.next(selectedStandard);
  }

  getStandard(id: number): Observable<ReadyToRunDTOs.IStandard> {
    if (this.standardsStore.standards) {
      const foundItem = this.standardsStore.standards.find(item => item.id === id);
      if (foundItem) {
        return of(foundItem);
      }
    }

    const url = `${this.standardsUrl}/${id}`;
    return this.http.get<ReadyToRunDTOs.IStandard>(url)
      .pipe(
        tap(data => console.log('getStandard: ' + JSON.stringify(data))),
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

  private initialiseStandardsData(allStandards: ReadyToRunDTOs.IAllStandards) {
    console.log("initaliseStandardsData : processing allStandards = ", allStandards);
    if (allStandards == null || allStandards.standards == null) {
      return;
    }

    // TODO - look at deepCopy
    this.standardsStore.standards = JSON.parse(JSON.stringify(allStandards.standards));

    this.publishAllStandards();
  }

  /// Event publishing
  private publishAllStandards() {
    const standards = JSON.parse(JSON.stringify(this.standardsStore.standards));
    this._standards.next(standards);
  }
}
