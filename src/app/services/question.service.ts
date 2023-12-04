import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  public listQuestionsOfExam(examId:any) {
    return this.http.get(`${baserUrl}/questions/exam/${examId}`);
  }
}
