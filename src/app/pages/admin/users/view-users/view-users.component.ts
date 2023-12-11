import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { catchError, finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  users:any = [] = [];
  userRoles: { [key: number]: string} = {};

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.listUsers().pipe(
      catchError((error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los usuarios', 'error');
        throw error;
      }),
      finalize(() => {

      })
    ).subscribe((data: any) => {
      this.users = this.sortUsersByAdmin(data);
    });
  }

  private sortUsersByAdmin(users: any[]): any[] {
    return users.sort((a, b) => {
      const roleA = a.authorities[0].authority;
      const roleB = b.authorities[0].authority;

      return roleA === 'ADMIN' ? -1 : roleB === 'USER' ? 1 : 0;
    });
  }

/*
  ngOnInit(): void {
    this.loadUsers();
    this.userService.listUsers().subscribe(
      (data:any) => {
        this.users = data;
        console.log(this.users);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los usuarios', 'error');
      }
    )
  }
  loadUsers() {
    this.userService.listUsers().subscribe(
      (data: any) => {
        this.users = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los usuarios', 'error');
      }
    );
  }
  */
}

