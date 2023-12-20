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

  deleteCategory(categoryId:any) {
    Swal.fire({
      title: 'Eliminar categoría',
      text: '¿Estas seguro que deseas eliminar la categoría?',
      icon: 'warning',
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.categoryService.deleteCategory(categoryId).subscribe(
          (data) => {
            this.categories = this.categories.filter((category:any) => category.catId != categoryId);
            Swal.fire('Categoría eliminada', 'La categoría ha sido eliminada de la base de datos', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar la categoría', 'error');
          },
          () => {
            this.reloadCategories();
          }
        )
      }
    })
  }

  reloadCategories() {
    this.categoryService.listCategories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar las categorías.', 'error');
      }
    );
  }
}
