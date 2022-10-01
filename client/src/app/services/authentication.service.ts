import { HttpClient } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { hasProp } from "@shared/helpers/properties";
import { LocalStorageId } from "@shared/model/shared-enums";
import { BehaviorSubject } from "rxjs";

export interface IStoredUserInfo {
  user: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly authenticateUserUrl = '';

  private storageEventListenerHandler;
  private router!: Router;

  private _currentUserInfo: BehaviorSubject<IStoredUserInfo | null>;
  public get currentUser() {
    return this._currentUserInfo.asObservable();
  }

  constructor(
    private http: HttpClient,
    private injector: Injector
  ) {

    // Look for a previous user token
    let oldUserInfo: any = null;
    try {
      let lcl = localStorage.getItem(LocalStorageId.UserInfo);
      if (lcl != null) {
        oldUserInfo = JSON.parse(lcl);
      }
    }
    catch {
      console.error('Unrecoverable user in local storage');
    }

    if (oldUserInfo == null || !hasProp(oldUserInfo, 'user') || !hasProp(oldUserInfo, 'token') || oldUserInfo.user == null || oldUserInfo.token == null) {
      localStorage.removeItem(LocalStorageId.UserInfo);
      oldUserInfo = null;
    }
    this._currentUserInfo = new BehaviorSubject<IStoredUserInfo | null>(oldUserInfo);

    // Add window listener for local storage changes to UserInfo key on change we need to re-read the current user and publish it
    this.storageEventListenerHandler = (evt: StorageEvent) => {
      let userInfo: IStoredUserInfo;
      if (evt.key === LocalStorageId.UserInfo) {
        let lcl = localStorage.getItem(evt.key);
        userInfo = lcl != null ? JSON.parse(lcl) : null;
        if (userInfo == null || this._currentUserInfo.value == null || userInfo.user !== this._currentUserInfo.value.user) {
          // publish the change in user state
          this.publishNewUser(userInfo);
        } else {
          // just update the token, the user is the same
          this._currentUserInfo.value.token = userInfo.token;
        }
      }
    };

    window.addEventListener('storage', this.storageEventListenerHandler);
  }

  public login(username: string, password: string, fromStartUp: boolean = false): Promise<string> {
    return new Promise((resolve, reject) => {
      let url = ''; // destination url following login? may just need it for user update etc otherwise stay where we are? or pass in url to call for success case?
      // make the api call to authenticate
      resolve(url);

      // if authentication fails we can either handle it with the error side redirect - but this doesn't give us much control, perhaps server should
      // always succeed logn but with status code for client to handle?
    });
  }

  public logout() {
    // Remove user from local storage to log out
    localStorage.removeItem(LocalStorageId.UserInfo);
    this.publishNewUser(null);
  }

  private publishNewUser(newUserInfo: IStoredUserInfo | null) {
    this._currentUserInfo.next(newUserInfo);

    // Navigate to home page if user is logged out - we may not want this for all routes
    if (newUserInfo == null) {
      // This may be called from the constructor during application initialisation so we
      // may not have a rotuer instance yet.
      if (this.router == null) {
        this.router = this.injector.get(Router);
      }
      this.router.navigate(['welcome']);
    }
  }
}
