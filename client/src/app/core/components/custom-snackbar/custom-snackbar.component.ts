import { Component, Inject } from "@angular/core";
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'rtr-custom-snackbar',
  templateUrl: './custom-snackbar.component.html'
})
export class CustomSnackbarComponent {
  // Snackbars can only handle 2 lines of text beofer breaking visually so we limit
  // the message length to prevent this.
  textLimit = 400;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private snackBarRef: MatSnackBarRef<CustomSnackbarComponent> // this allows us to close this component from within itself
    ) {
  }

  onDismiss() {
    this.snackBarRef.dismiss();
  }
}
