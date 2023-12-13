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

  itWasSent = false;
  timer: any;
  
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
        this.timer = this.questions.length *2 * 60;
        this.questions.forEach((q:any) => {
          q['givenAnswer'] = '';
        })
        console.log(this.questions);
        this.startTimer();
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar las preguntas del exámen', 'error');
      }
    )
  }

  startTimer() {
    let t = window.setInterval(() => {
      if(this.timer <= 0) {
        this.evaluateExam();
        clearInterval(t);
      } else {
        this.timer --;
      }
    }, 1000)
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
    }).then((e) => {
      if(e.isConfirmed) {
        this.evaluateExam();
      }
    })
  }

  evaluateExam() {
    this.questionService.evaluateExam(this.questions).subscribe(
      (data:any) => {
        console.log(data);
        this.pointsAchieved = data.maxScore;
        this.correctAnswers = data.correctAnswers;
        this.attempts = data.attemts;
        this.itWasSent = true;
      },
      (error) => {
        console.log(error);
      }
    )

    /*
    this.itWasSent = true;
        this.questions.forEach((q:any) => {
          if(q.givenAnswer == q.answer) {
            this.correctAnswers ++;
            let score = this.questions[0].exam.maxScore/this.questions.length;
            this.pointsAchieved += score;
          }
          if(q.givenAnswer.trim() != '') {
            this.attempts ++;
          }
        });
        console.log("Respuestas correctas : " + this.correctAnswers);
        console.log("Puntos conseguidos : " + this.pointsAchieved);
        console.log("Intentos : " + this.attempts);
        console.log(this.questions);
        */
  }

  printPage() {
    window.print();
  }
  

  getFormattedTime() {
    let mm = Math.floor(this.timer/60);
    let ss = this.timer - mm*60;
    return `${mm} : min : ${ss} seg`;
  }
}
