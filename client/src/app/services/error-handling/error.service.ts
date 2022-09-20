import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

import { hasProp } from "@shared/helpers/properties";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private  backendName : string = 'R2R';

  getClientErrorMessage(error: Error): string {
    return error.message ? error.message : error.toString();
  }

  getClientErrorStackTrace(error: Error): string {
    return error.stack ?? '';
  }

  /**
   * Helper function decodes the HTTP response from the server and returns a user
   * friendly message.
   * @param error
   * @returns
   */
  getServerErrorMessage(error: HttpErrorResponse) : string {
    if (navigator.onLine) {
      let msgLine1 = '';
      let msgLine2 = '';

      if (error != null && hasProp(error, 'error') && error.error != null &&
          hasProp(error.error, 'code') && hasProp(error.error, 'message')) {
        msgLine1 = this.backendName + ' Error ' + error.error.code;
        msgLine2 = error.error.message;
      } else  if (hasProp(error, 'status') && hasProp(error, 'statusText')) {
        // standard http error response
        msgLine1 = 'Http Error ' + error.status;
        msgLine2 = error.statusText;
      }

      if (msgLine2 !== '') {
        // We have a second line, combine it with the first
        msgLine1 = msgLine1 + '\n' + msgLine2;
      }

      return msgLine1;
    }

    return 'No server connection';
  }

  // Not yet implemented - maybe scope for returned stack information from custom server error message?
  getServerErrorStackTrace(error: HttpErrorResponse): string {
    // Handle stack trace ??
    if (error != null && hasProp(error, 'error') && error.error != null &&
        hasProp(error.error, 'stacktrace')) {
      return this.backendName + ' Stack Trace \n' + error.error.stacktrace;
    } else {
      return '';
    }
  }
}
