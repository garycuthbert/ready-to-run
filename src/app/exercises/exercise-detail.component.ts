import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationHistoryService } from '../shared/navigation-history.service';

@Component({
  selector: 'rtr-exercise-detail',
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.css']
})
export class ExerciseDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private navHistory: NavigationHistoryService) {
    console.log('ExerciseDetailComponent constructed!');
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    let id = param ? +param : 0;
    console.log('exercise details for id = ' + id);
  }

  onBack(): void {
    this.navHistory.goBack();
  }
}
