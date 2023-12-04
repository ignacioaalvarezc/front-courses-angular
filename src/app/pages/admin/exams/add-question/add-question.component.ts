import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})

export class AddQuestionComponent implements OnInit{

  examId:any;
  title: any;
  question: any = {
    exam: {},
    content: '',
    firstOption: '',
    secondOption: '',
    thirdOption: '',
    fourthOption: '',
    answer: ''
  }

  constructor(private route:ActivatedRoute,
              private router:Router,
              private location:Location,
              private questionService:QuestionService) { }

  ngOnInit(): void {
    this.examId = this.route.snapshot.params['examId'];
    this.title = this.route.snapshot.params['title'];
    this.question.exam['examId'] = this.examId;
  }

  goBack(): void {
    this.location.back();
  }

  formSubmit() {
    if(this.question.content.trim() == '' || this.question.content == null) {
      return;
    }
    if(this.question.firstOption.trim() == '' || this.question.firstOption == null) {
      return;
    }
    if(this.question.secondOption.trim() == '' || this.question.secondOption == null) {
      return;
    }
    if(this.question.thirdOption.trim() == '' || this.question.thirdOption == null) {
      return;
    }
    if(this.question.fourthOption.trim() == '' || this.question.fourthOption == null) {
      return;
    }
    if(this.question.answer.trim() == '' || this.question.answer == null) {
      return;
    }
    this.questionService.saveQuestion(this.question).subscribe(
      (data) => {
        Swal.fire('Pregunta guardada', 'La pregunta ha sido guardada con éxito', 'success');
        this.question.content = '';
        this.question.firstOption = '';
        this.question.secondOption = '';
        this.question.thirdOption = '';
        this.question.fourthOption = '';
        this.question.answer = '';
      }, (error) => {
        Swal.fire('Error', 'Error al guardar la pregunta en el sistema', 'error');
        console.log(error);
      }
    )

  }

}
