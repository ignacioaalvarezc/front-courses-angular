import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit{

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;

  isAdmin: boolean = false;
  isUser: boolean = false;
  categories: any;

  constructor(private loginService:LoginService,
              private router:Router,
              private categoryService:CategoryService,
              private snack:MatSnackBar) { }

  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      this.isAdmin = this.loginService.getUserRole() === 'ADMIN';
      this.isUser = this.loginService.getUserRole() === 'USER';
    }
    this.loginService.loginStatusSubject.subscribe(loggedIn => {
      if (loggedIn) {
        this.isAdmin = this.loginService.getUserRole() === 'ADMIN';
        this.isUser = this.loginService.getUserRole() === 'USER';
      }
    });  
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


  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  shouldShowSidebar(): boolean {
    return this.loginService.isLoggedIn();
  }  

  public logout() {
    this.loginService.logout();
    this.router.navigate(['/login'])
    window.location.reload();
  }
}
