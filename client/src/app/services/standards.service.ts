import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ReadyToRunDTOs } from "@shared/model/ReadyToRunDTOs";

@Injectable({
  providedIn: 'root'
})
export class StandardsService {

  private _standards: BehaviorSubject<ReadyToRunDTOs.IStandard[] | null> = <BehaviorSubject<ReadyToRunDTOs.IStandard[] | null>>new BehaviorSubject(null);
  get standards() {
    return this._standards.asObservable();
  }

  private readonly standardsUrl = 'webui/standards';

  constructor(
    private http: HttpClient
  ) {
    // Fetch initial data from the server, process it to set up the main store.
    // Subscribe to external notifications which will
    this.http.get<ReadyToRunDTOs.IStandard[]>(this.standardsUrl).subscribe(

    );
  }
}
