import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http:HttpClient) { }

  public listExams() {
    return this.http.get(`${baserUrl}/exams/`);
  }

  public saveExam(exam:any) {
    return this.http.post(`${baserUrl}/exams/`, exam);
  }
  
  public deleteExam(examId:any) {
    return this.http.delete(`${baserUrl}/exams/${examId}`);
  }

  public getExam(examId:any) {
    return this.http.get(`${baserUrl}/exams/${examId}`);
  }

  public updateExam(exam:any) {
    return this.http.put(`${baserUrl}/exams/`, exam);
  }

  public listExamsOfACategory(categoryId:any){
    return this.http.get(`${baserUrl}/exams/category/${categoryId}`);
  }

  public getEnabledExams(){
    return this.http.get(`${baserUrl}/exams/enabled/`);
  }

  public getEnabledExamsOfACategory(categoryId:any) {
    return this.http.get(`${baserUrl}/exams/category/enabled/${categoryId}`); 
  }
}
