/**
 * Custom module to encapsulate angular material imports in one location
 * separate from the App module (and any others).
 */
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  imports: [
    MatIconModule
  ],
  exports: [
    MatIconModule
  ]
})
export class MaterialModule {

}
