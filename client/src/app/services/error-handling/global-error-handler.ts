import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

import { ErrorService } from "./error.service";
import { NotificationService } from "./notification.service";

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler{

  constructor(private injector: Injector) {}

  private lastErrorMessageIndex = 0;
  private lastErrorMessages: string[] = [];
  private bufferSize = 5;

  handleError(error: Error | HttpErrorResponse) {
    // Error handling is essential and so is loaded first, we
    // cannot use constructor injection for the services so we
    // inject them manually with Injector.
    const errorService = this.injector.get(ErrorService);
    const notifier = this.injector.get(NotificationService);

    let message: string;
    let stackTrace: string;

    // Browser cache problem detection
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;
    if (chunkFailedMessage.test(error.message)) {
      window.location.reload();
      return;
    }

    // Trick to access wrapped http errors
    // while (error['rejection']) { // something to do with promises?
    //    error = error['rejection'];
    // }

    if (error instanceof HttpErrorResponse) {
      message = errorService.getServerErrorMessage(error);
      notifier.warn(message);
    } else {
      message = errorService.getClientErrorMessage(error);
      if (this.isNewError(message)) {
        stackTrace = errorService.getClientErrorStackTrace(error);
        notifier.error(message);
      } else {
        message = 'Suppressing duplicate errors: ' + message;
        notifier.error(message);
      }
    }
  }

  /**
   * Method keeps up to the last this.bufferSize error messages so if we get
   * a flurry of the same error message it will not be repeated.
   * @param message
   * @returns
   */
  private isNewError(message : string) : boolean {
    if (this.lastErrorMessages.indexOf(message) > -1) {
      return false; // message seen already
    } else {
      this.lastErrorMessages[this.lastErrorMessageIndex] = message;
      this.lastErrorMessageIndex = (this.lastErrorMessageIndex + 1) % this.bufferSize;
      return true; // new message
    }
  }
}
