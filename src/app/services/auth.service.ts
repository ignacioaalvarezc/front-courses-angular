import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated(): boolean {
    return this.loginService.isLoggedIn();
  }

  getUserRole(): string | null {
    return this.loginService.getUserRole();
  }

  constructor(private loginService:LoginService) { }
}
