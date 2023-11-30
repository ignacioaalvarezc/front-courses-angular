import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
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

  constructor(private categoryService:CategoryService) { }

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

}
