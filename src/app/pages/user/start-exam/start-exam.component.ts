import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-start-exam',
  templateUrl: './start-exam.component.html',
  styleUrls: ['./start-exam.component.css']
})
export class StartExamComponent implements OnInit {

  examId: any;
  questions: any;
  
  constructor(private locationSt:LocationStrategy,
              private route:ActivatedRoute,
              private questionService:QuestionService) { }

  ngOnInit(): void {
    this.lockBackButton();
  }

  uploadQuestions() {
    this.questionService.listExamQuestionsForTest(this.examId).subscribe(
      
    )
  }

  lockBackButton() {
    history.pushState(null, null!, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, null!, location.href);
    })
  }

}
