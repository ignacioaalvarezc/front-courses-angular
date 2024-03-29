import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';
import { adminNavData } from './admin-navData';
import { userNavData } from './user-navData';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import Swal from 'sweetalert2';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('350ms',
          style({opacity: 0})
        )
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
        keyframes([
          style({transform: 'rotate(0deg)', offset: '0'}),
          style({transform: 'rotate(2turn)', offset: '1'})
        ]))
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit{

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  adminNavData = adminNavData;
  userNavData = userNavData;
  screenWidth = 0;

  isAdmin: boolean = false;
  isUser: boolean = false;
  categories: any;

  constructor(private loginService:LoginService,
              private router:Router,
              private categoryService:CategoryService,
              private snack:MatSnackBar) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
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
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cerrar tu sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cerrar sesión'
    }).then((result) => {
      if(result.isConfirmed) {
        this.loginService.logout();
        this.router.navigate(['/login'])
      }
    });
  }
}
