import { Component, NgModule } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData = {
    "username" : '',
    "password" : ''
  }

  constructor(private snack:MatSnackBar) { }

  ngOnInit(): void {

  }

  formSubmit() {
    if(this.loginData.username.trim() == '' || this.loginData.username) {

    }
  }

}

