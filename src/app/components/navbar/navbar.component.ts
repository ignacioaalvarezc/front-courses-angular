// IMPORTS
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: any = new Object(); // VARIABLE TO STORE USER INFORMATION

  constructor(public login:LoginService,
              private router:Router) {}
 
  ngOnInit() {
    // SUBSCRIBE TO THE CURRENT USER OBSERVABLE
    this.login.getCurrentUser().subscribe((user: any) => {
      this.user = user; // UPDATE THE USER VARIABLE WHEN THE USER CHANGES
    });
  }

  // CHECK IF THE CURRENT PAGE IS THE LOGIN PAGE
  isLoginPage(): boolean {
    return this.router.url.includes('/login');
  }

  // LOGOUT FUNCTION
  public logout(){
    this.login.logout(); // CALL THE LOGOUT METHOD FROM THE LOGIN SERVICE
    window.location.reload();
  }
}
