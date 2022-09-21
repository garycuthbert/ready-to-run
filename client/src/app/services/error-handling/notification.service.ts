import { Injectable, NgZone, OnDestroy } from "@angular/core";
import { BehaviorSubject, filter, map, Subject, takeUntil, tap } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

import { CustomSnackbarComponent } from "app/core/components/custom-snackbar/custom-snackbar.component";

interface SnackBarQueueItem {
  message: string;
  beingDispatched: boolean;
  icon?: string;
  style?: string;
  duration?: number;
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
      this.snackBarQueue$
        .pipe(
          filter(queue => queue.length > 0 && !queue[0].beingDispatched),
          tap(() => {
            const updatedQueue = this.snackBarQueue.value;
            updatedQueue[0].beingDispatched = true;
            this.snackBarQueue.next(updatedQueue);
          }),
          map(queue => queue[0]),
          takeUntil(this.ngDestroy)
        )
        .subscribe(snackBarItem => this.getSnackBar(snackBarItem.icon, snackBarItem.style, snackBarItem.duration, snackBarItem.message));
  }

  ngOnDestroy(): void {
    this.ngDestroy.next(null);
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
    });
  }
}
