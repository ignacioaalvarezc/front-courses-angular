import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

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
              private questionService:QuestionService,
              private location:Location,
              private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.examId = this.route.snapshot.params['examId'];
    this.title = this.route.snapshot.params['title'];
    this.questionService.listExamQuestions(this.examId).subscribe(
      (data:any) => {
        console.log(data);
        this.questions = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  deleteQuestion(questionId:any) {
    Swal.fire({
      title:'Eliminar pregunta',
      text: '¿Estas seguro de que quieres eliminar esta pregunta?',
      icon: 'warning',
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'  
    }).then((result) => {
      if(result.isConfirmed) {
        this.questionService.deleteQuestion(questionId).subscribe(
          (data) => {
            this.snack.open('Pregunta eliminada', '', {
              duration: 3000
            })
            this.questions = this.questions.filter((question:any) => question.questionId != questionId);
          },
          (error) => {
            this.snack.open('Error al eliminar la pregunta', '', {
              duration: 3000
            })
            console.log(error);
          }
        )
      }
    })
  }

  goBack(): void {
    this.location.back();
  }

}
