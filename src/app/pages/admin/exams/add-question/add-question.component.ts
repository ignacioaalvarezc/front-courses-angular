import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

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
              private location:Location) { }

  ngOnInit(): void {
    this.examId = this.route.snapshot.params['examId'];
    this.title = this.route.snapshot.params['title'];
    this.question.exam['examId'] = this.examId;
  }

  goBack(): void {
    this.location.back();
  }

}
