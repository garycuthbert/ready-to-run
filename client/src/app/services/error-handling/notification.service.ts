import { Injectable, NgZone, OnDestroy } from "@angular/core";
import { BehaviorSubject, delay, filter, map, Observable, Subject, take, takeUntil, tap } from "rxjs";
import { MatSnackBar, MatSnackBarDismiss } from "@angular/material/snack-bar";

import { CustomSnackbarComponent } from "@core/components/custom-snackbar/custom-snackbar.component";

interface SnackBarQueueItem {
  message: string;
  beingDispatched: boolean;
  icon: string;
  style: string;
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnDestroy {

  private readonly snackBarQueue = new BehaviorSubject<SnackBarQueueItem[]>([]);
  private readonly snackBarQueue$ = this.snackBarQueue.asObservable();
  private readonly ngDestroy = new Subject();

  constructor(
    private snackBar: MatSnackBar,
    private zone: NgZone
    ) {
      this.snackBarQueue$ // this will be stimulated when queuSnackBar is called and the snackBarQueue observable is updated (next())
        .pipe(
          filter(queue => queue.length > 0 && !queue[0].beingDispatched), // only process entries if the first entry has not been dispatched yet
          tap(() => {
            const updatedQueue = this.snackBarQueue.value; // get the current queue
            updatedQueue[0].beingDispatched = true; // mark the first entry as being dispatched
            this.snackBarQueue.next(updatedQueue); // restimulate by passing the edited queue back into the BehaviourSubject
          }),
          map(queue => queue[0]), // pass on the first queued entry to the emit
          takeUntil(this.ngDestroy) // keep emitting until our ngDestroy observavble emits
        )
        .subscribe(
          // We should get the first item from the snackBarQueue, pass the details to getSnackBar to create a new instance of teh snackBar
          snackBarItem => this.getSnackBar(snackBarItem.icon, snackBarItem.style, snackBarItem.duration, snackBarItem.message)
        );
  }

  /**
   * Add an error notifcation.
   * Must be dismaissed by the user.
   * @param msg
   */
  error(msg: string) {
    this.queueSnackBar(msg, 'clear', 20000, 'error-snackbar');
  }

  /**
   * Add a warning.
   * Must be dismissed by the user.
   * @param msg
   */
  warn(msg: string) {
    this.queueSnackBar(msg, 'warning', 5000, 'warn-snackbar');
  }

  /**
   * Add an information message.
   * Times out.
   * @param msg
   */
  info(msg: string) {
    this.queueSnackBar(msg, 'info', 2000, 'info-snackbar');
  }

  /**
   * Method opens the snack bar from our custom component
   * @param iconValue
   * @param classValue
   * @param durationValue
   * @param messageValue
   */
  getSnackBar(iconValue: string, classValue: string, durationValue: number, messageValue: string) {
    this.zone.run(() => {
      const snack = this.snackBar.openFromComponent(CustomSnackbarComponent,
        {
          data: {
            message: messageValue,
            icon: iconValue
          },
          duration: durationValue,
          panelClass: [classValue]
        });

        const snack$ = snack.afterDismissed();
        this.removeDismissedSnackBar(snack$);
    });
  }

  /**
   * Method adds details passed as a new item onto the end of the snackBarQueue, if the queue is
   * greater than 20 entries long it will ignore the new item. The act of adding an item (next())
   * stimulates the queue (BehaviourSubject) which triggers the queue observable setup in the
   * constructor to action the change.
   * @param message
   * @param icon
   * @param duration
   * @param style
   */
  public queueSnackBar(message: string, icon: string, duration: number, style: string) {
    if (this.snackBarQueue.value.length < 20) { // We limit the size the queue can grow to 20 items
      this.snackBarQueue.next( // next will stimulate the BehaviourSubject to notify its observable
        this.snackBarQueue.value.concat([ // concat adds the items onto the end of the array
          {
            message: message,
            icon: icon,
            duration: duration,
            style: style,
            beingDispatched: false}
        ])
      );
    }
  }

  private removeDismissedSnackBar(dismissed: Observable<MatSnackBarDismiss>) {
    dismissed
      .pipe(
        delay(200),
        take(1) // emit only 1 value from the dismissed observable
      )
      .subscribe(() => {
        const updatedQueue = this.snackBarQueue.value;
        if (updatedQueue[0].beingDispatched) {
          updatedQueue.shift(); // Remove the item from the queue
        }
        // Call next to move processing to next item in queue (if one is there)
        this.snackBarQueue.next(updatedQueue);
      });
  }

  ngOnDestroy(): void {
    this.snackBarQueue.next([]); // clear the BehaviourSubject
    this.snackBarQueue.complete();
    this.ngDestroy.next(1);
    this.ngDestroy.complete();
  }
}
