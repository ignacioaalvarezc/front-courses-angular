import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories:any = [

  ]

  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.categoryService.listCategories().subscribe(
      (data:any) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar las categorías.', 'error');
      }
    )
  }

}
