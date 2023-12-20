import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  public listCategories(){
    return this.http.get(`${baserUrl}/categories/`)
  }

  public addCategory(category:any) {
    return this.http.post(`${baserUrl}/categories/`, category)
  }

  public deleteCategory(catId:any) {
    return this.http.delete(`${baserUrl}/categories/${catId}`);
  }
}
