import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit{

  examId: any;
  exam: any;

  constructor(
    private examService:ExamService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.examId = this.route.snapshot.params['examId'];
    this.examService.getExam(this.examId).subscribe(
      (data:any) => {
        console.log(data);
        this.exam = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
