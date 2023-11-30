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
}
