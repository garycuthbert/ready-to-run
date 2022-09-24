/**
 * Custom module to encapsulate angular material imports in one location
 * separate from the App module (and any others).
 */
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
  imports: [
    MatIconModule,
    MatSnackBarModule
  ],
  exports: [
    MatIconModule,
    MatSnackBarModule
  ]
})
export class MaterialModule {

}
