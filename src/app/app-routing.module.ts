import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './home/shell.component';
import { WelcomeComponent } from './home/welcome.component';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot([
      {
        path: '', component: ShellComponent,
        children: [
          { path: 'welcome', component: WelcomeComponent },
          {
            path: "standards",
            loadChildren: () => import('./standards/standards.module').then(m => m.StandardsModule)
          },
          { path: '', redirectTo: 'welcome', pathMatch: 'full' }
        ]
      },
    ]),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
