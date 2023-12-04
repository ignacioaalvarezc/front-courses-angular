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
}
