import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { ExamService } from 'src/app/services/exam.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-exams',
  templateUrl: './add-exams.component.html',
  styleUrls: ['./add-exams.component.css']
})
export class AddExamsComponent implements OnInit {

  categories: any = [];

  examData = {
    title: '',
    description: '',
    maxScore: '',
    questionsAmount: '',
    enabled: true,
    category: {
      categoryId: ''
    }
  }

  constructor(private categoryService:CategoryService,
              private snack:MatSnackBar,
              private examService:ExamService) { }

  ngOnInit(): void {
    this.categoryService.listCategories().subscribe(
      (data:any) => {
        this.categories = data;
        console.log(this.categories);
      }, (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar las categorías', 'error');
      }
    )
  }

  saveExam() {
    console.log(this.examData);
    if(this.examData.title.trim() == '' || this.examData.title == null) {
      this.snack.open('El título es requerido', '', {
        duration: 3000
      });
      return;
    }
    this.examService.saveExam(this.examData).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Examen guardado', 'El examen ha sido guardado con éxito', 'success');
        this.examData = {
          title: '',
          description: '',
          maxScore: '',
          questionsAmount: '',
          enabled: true,
          category: {
            categoryId: ''
          }
        }
      },
      (error) => {
        Swal.fire('Error', 'Error al guardar el exámen', 'error');
      }
    )
  }
}


