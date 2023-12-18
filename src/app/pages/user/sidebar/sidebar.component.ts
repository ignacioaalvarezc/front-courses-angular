import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categories: any;

  constructor(private categoryService:CategoryService,
              private snack:MatSnackBar,
              private loginService:LoginService
  ) { }

  ngOnInit(): void {
    this.categoryService.listCategories().subscribe(
      (data:any) => {
        this.categories = data;
      },
      (error) => {
        this.snack.open('Error al cargar las categorias', '', {
          duration: 3000
        })
        console.log(error);
      }
    )
  }

  public logout() {
    this.loginService.logout();
    window.location.reload();
  }

}
