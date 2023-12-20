import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  public listUsers() {
    return this.http.get(`${baserUrl}/users/`)
  }

  public addUser(user:any): Observable<any> {
    return this.http.post(`${baserUrl}/users/`, user);
  }

  public saveAdmin(user:any): Observable<any> {
    return this.http.post(`${baserUrl}/users/save-admin`, user);
  }

  public getUser(userId:any) {
    return this.http.get(`${baserUrl}/users/${userId}`);
  }

  public updateUser(userId: any, user: any): Observable<any> {
    return this.http.put(`${baserUrl}/users/${userId}`, user);
  }

  public toggleUserStatus(userId: any, newStatus: boolean): Observable<any> {
    return this.http.put(`${baserUrl}/users/toggle-status/${userId}`, { enabled: newStatus });
  }

}
