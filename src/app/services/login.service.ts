import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  // GENERANDO EL TOKEN.
  public generateToken(loginData:any) {
    return this.http.post(`${baserUrl}/generate-token`, loginData);
  }

  public getCurrentUser() {
    return this.http.get(`${baserUrl}/current-user`);
  }

  // INICIAR SESION GUARDANDO EL TOKEN EN EL LOCALSTORAGE.
  public loginUser(token:any) {
    localStorage.setItem('token', token);
    return true;
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

  private handleLoginResponse(response: any) {
    if(response instanceof HttpErrorResponse) {
      if(response.status === 401 && response.error === 'Usuario deshabilitado') {
        Swal.fire('Usuario bloqueado', 'Su cuenta ha sido deshabilitada. Comuniquese con soporte para mas información.', 'error');
      } else {
        Swal.fire('Error de autenticación', 'Credenciales inválidas', 'error');
      }
    } else {
      this.loginUser(response.token);
      this.loginStatusSubject.next(true);
      Swal.fire('Inicio de sesión exitoso', '¡Bienvenido!', 'success');
    }
  }  
}
