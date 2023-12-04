import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {

  examId: any;
  title: any;
  questions: any = [];

  constructor(private route:ActivatedRoute,
              private questionService:QuestionService) { }

  ngOnInit(): void {
    this.examId = this.route.snapshot.params['examId'];
    this.title = this.route.snapshot.params['title'];
    this.questionService.listQuestionsOfExam(this.examId).subscribe(
      (data:any) => {
        console.log(data);
        this.questions = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
