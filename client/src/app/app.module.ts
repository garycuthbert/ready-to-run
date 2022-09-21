import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './home/menu.component';
import { WelcomeComponent } from './home/welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { UserModule } from './user/user.module';
import { StandardsModule } from './standards/standards.module';
import { ExerciseModule } from './exercises/exercise.module';
import { PageNotFoundComponent } from './page-not-found.component';
import { GlobalErrorHandler } from './services/error-handling/global-error-handler';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomSnackbarComponent } from './core/components/custom-snackbar/custom-snackbar.component';

import { MaterialModule } from '@shared/material.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    CustomSnackbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    UserModule,
    StandardsModule,
    ExerciseModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
