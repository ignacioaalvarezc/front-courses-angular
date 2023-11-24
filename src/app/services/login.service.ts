import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  // GENERANDO EL TOKEN.
  public generateToken(loginData:any) {
    return this.http.post(`${baserUrl}/generate-token`, loginData);
  }

  // INICIAR SESION GUARDANDO EL TOKEN EN EL LOCALSTORAGE.
  public loginUser(token:any) {
    localStorage.setItem('token', token);
  }

  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  // CIERRA SESIÓN Y BORRA EL TOKEN DEL LOCALSTORAGE.
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // OBTIENE EL TOKEN.
  public getToken() {
    return localStorage.getItem('token');
  }

  public setUser(user:any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser() {
    let userStr = localStorage.getItem('user');
    if(userStr != null) {
      return JSON.parse(userStr)
    } else {
      this.logout();
      return null;
    }
  }

  // OBTIENE EL ROL DEL USUARIO.
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  public getCurrentUser() {
    return this.http.get(`${baserUrl}/current-user`);
  }
}
