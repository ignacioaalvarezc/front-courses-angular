import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit{

  category = {
    tittle: '',
    description: ''
  }

  constructor(private categoryService:CategoryService,
              private snack:MatSnackBar) {}

  ngOnInit(): void {

  }

  formSubmit() {
    if(this.category.tittle.trim() == '' || this.category.tittle == null) {
      this.snack.open("El título es requerido.", '', {
        duration: 3000
      })
      return;
    }
    this.categoryService.addCategory(this.category).subscribe(
      (data:any) => {
        this.category.tittle = '';
        this.category.description = '';
        Swal.fire('Categoría agregada', 'La categoría ha sido agregada con éxito.', 'success');
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al agregar la categoría', 'error');
      }
    )
  }

}
