import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, EMPTY, Observable, of } from "rxjs";
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
    /*return this.http.get<ReadyToRunDTOs.IStandard>(url)
      .pipe(
        tap(data => console.log('getStandard: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );*/
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
