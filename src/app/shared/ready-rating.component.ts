import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'rtr-ready-rating',
  templateUrl: './ready-rating.component.html',
  styleUrls: ['./ready-rating.component.css']
})
export class ReadyRatingComponent implements OnChanges {
  @Input() rating: number = 0;
  ratingPercent: string = '0px';

  ngOnChanges(): void {
    this.ratingPercent = (this.rating * 75 / 5) + 'px';
  }
}
