import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  questionId: any = 0;
  question: any;
  exam:any;

  constructor(private route:ActivatedRoute,
              private questionService:QuestionService,
              private router:Router,
              private location:Location
  ) { }

  ngOnInit(): void {
    this.questionId = this.route.snapshot.params['questionId'];
    this.questionService.getQuestion(this.questionId).subscribe(
      (data:any) => {
        this.question = data;
        console.log(this.question);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  public updateQuestionData() {
    this.questionService.updateQuestion(this.question).subscribe(
      (data) => {
        Swal.fire('Pregunta actualzada', 'La pregunta ha sido actualizada con éxito', 'success').then((e) => {
          this.router.navigate(['/admin/view-questions/'+this.question.exam.examId+'/'+this.question]);
        })
      }
    )
  }

  goBack(): void {
    this.location.back();
  }
}
