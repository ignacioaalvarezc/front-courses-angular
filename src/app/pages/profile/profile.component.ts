import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any = null;

  constructor(private loginService:LoginService,
              private router:Router) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
  }
  
  goBack(): void {
    const role = this.loginService.getUserRole();

    if (role === 'ADMIN') {
      this.router.navigate(['/admin']);
    } else if (role === 'USER') {
      this.router.navigate(['/user-dashboard/0']);
    }
  }
}
