import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExerciseShellComponent } from './exercises/exercise-shell.component';
import { ShellComponent } from './home/shell.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { StandardShellComponent } from './standards/standard-shell.component';
import { StandardSummaryListComponent } from './standards/standard-summary-list.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot([
      {
        path: '', component: ShellComponent,
        children: [
          { path: 'welcome', component: WelcomeComponent },
          { path: 'overview', component: StandardSummaryListComponent },
          { path: 'standards', component: StandardShellComponent },
          { path: 'exercises', component: ExerciseShellComponent },
          // {
          //   path: "summary", // lazy loading example
          //   loadChildren: () => import('./standards/standards.module').then(m => m.StandardsModule)
          // },
          { path: '', redirectTo: 'welcome', pathMatch: 'full' }
        ]
      },
      {path: '**', component: PageNotFoundComponent }
    ]),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
