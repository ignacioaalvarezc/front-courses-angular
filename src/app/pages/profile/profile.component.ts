import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any = null;

  constructor(private loginService:LoginService,
              private location: Location) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
  }
  
  goBack(): void {
    this.location.back();
  }
}
