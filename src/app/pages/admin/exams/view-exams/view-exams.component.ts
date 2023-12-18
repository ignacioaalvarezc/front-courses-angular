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

  getStatusText(enabled: boolean): string {
    return enabled ? 'Activo' : 'Desactivado';
  }

  deleteExam(examId:any) {
    Swal.fire({
      title: 'Eliminar exámen',
      text: '¿Estas seguro que deseas eliminar el exámen?',
      icon: 'warning',
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.examService.deleteExam(examId).subscribe(
          (data) => {
            this.exams = this.exams.filter((exam:any) => exam.examId != examId);
            Swal.fire('Exámen eliminado', 'El examen ha sido eliminado de la base de datos', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar el exámen', 'error');
          }
        )
      }
    })
  }

}
