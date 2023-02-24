import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rtr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  pageTitle = 'Ready to Run';

  constructor() { }

  ngOnInit(): void {
  }

}
