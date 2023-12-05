import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  public listExamQuestions(examId:any) {
    return this.http.get(`${baserUrl}/questions/exam/all/${examId}`);
  }

  public saveQuestion(question:any) {
    return this.http.post(`${baserUrl}/questions/`, question);
  }

  public deleteQuestion(questionId:any) {
    return this.http.delete(`${baserUrl}/questions/${questionId}`);
  }

  public updateQuestion(question:any) {
    return this.http.put(`${baserUrl}/questions/`, question);
  }

  public getQuestion(questionId:any) {
    return this.http.get(`${baserUrl}/questions/${questionId}`);
  }
}
