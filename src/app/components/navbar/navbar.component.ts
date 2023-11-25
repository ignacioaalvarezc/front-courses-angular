import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any;

  constructor(public login:LoginService,
              private router:Router) {}
 
  ngOnInit() {
    this.login.getCurrentUser().subscribe((user: any) => {
      this.user = user;
    });
  }

  isLoginPage(): boolean {
    return this.router.url.includes('/login');
  }

  public logout(){
    this.login.logout();
    window.location.reload();
  }
}
