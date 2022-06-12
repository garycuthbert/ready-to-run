import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';
  pageTitle = "Log In";

  constructor(private router: Router) { }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  ngOnInit(): void {
  }

}
