import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-exam',
  templateUrl: './start-exam.component.html',
  styleUrls: ['./start-exam.component.css']
})
export class StartExamComponent implements OnInit {

  examId: any;
  questions: any;
  pointsAchieved = 0;
  correctAnswers = 0;
  attempts = 0;
  
  constructor(private locationSt:LocationStrategy,
              private route:ActivatedRoute,
              private questionService:QuestionService) { }

  ngOnInit(): void {
    this.lockBackButton();
    this.examId = this.route.snapshot.params['examId'];
    console.log(this.examId);
    this.uploadQuestions();
  }

  uploadQuestions() {
    this.questionService.listExamQuestionsForTest(this.examId).subscribe(
      (data:any) => {
        console.log(data);
        this.questions = data;
        this.questions.forEach((q:any) => {
          q['givenAnswer'] = '';
        })
        console.log(this.questions);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar las preguntas del exámen', 'error');
      }
    )
  }

  lockBackButton() {
    history.pushState(null, null!, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, null!, location.href);
    })
  }

  sendExam() {
    Swal.fire({
      title: 'Estas seguro de que quieres enviar tu respuesta?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Enviar',
      icon: 'info'
    }).then((result) => {
      if(result.isConfirmed){
        this.questions.forEach((q:any) => {
         
        })
      }
    })
  }
}
