import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit{

  category = {
    title: '',
    description: ''
  }

  constructor(private categoryService:CategoryService,
              private snack:MatSnackBar,
              private location:Location,
              private router:Router) {}

  ngOnInit(): void {

  }

  onFormSubmit() {
    if(this.category.title.trim() == '' || this.category.title == null) {
      this.snack.open("El título es requerido.", '', {
        duration: 3000
      })
      return;
    }
    this.categoryService.addCategory(this.category).subscribe(
      (data:any) => {
        this.category.title = '';
        this.category.description = '';
        Swal.fire('Categoría agregada', 'La categoría ha sido agregada con éxito.', 'success');
        this.router.navigate(['/admin/categories'])
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al agregar la categoría', 'error');
      }
    )
  }

  goBack(): void {
    this.location.back();
  }  

}
