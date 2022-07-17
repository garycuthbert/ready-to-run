import { Component } from '@angular/core';
import { NavigationHistoryService } from './shared/navigation-history.service';

@Component({
  selector: 'rtr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private navigationHistory : NavigationHistoryService) {
    this.navigationHistory.startSaveHistory();
  }
}
