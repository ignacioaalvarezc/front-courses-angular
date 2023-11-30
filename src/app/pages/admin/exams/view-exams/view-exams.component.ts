import { Component, OnInit } from '@angular/core';
import { ExamService } from 'src/app/services/exam.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-exams',
  templateUrl: './view-exams.component.html',
  styleUrls: ['./view-exams.component.css']
})
export class ViewExamsComponent implements OnInit {

  exams: any = [

  ]

  constructor(private examService:ExamService) { }

  ngOnInit(): void {
    this.examService.listExams().subscribe(
      (data:any) => {
        this.exams = data;
        console.log(this.exams);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los exámenes', 'error');
      }
    )
  }

}
