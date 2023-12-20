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

  toggleUserStatus(userId: any, newStatus: boolean) {
    const actionText1 = newStatus ? 'desbloquear' : 'bloquear';
    const actionText2 = newStatus ? 'desbloqueado' : 'bloqueado';

    Swal.fire({
      title: `¿Estas seguro de que quieres ${actionText1} al usuario?`,
      text: `El usuario será ${actionText2} y no podra iniciar sesión.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed) {
        this.userService.toggleUserStatus(userId, newStatus).subscribe(() => {
          Swal.fire({
            title: `Usuario ${actionText2} con éxito`,
            icon: `success`,
            confirmButtonText: 'OK'
          }).then(() => {
            this.loadUsers();
          });
        });
        window.location.reload();
      }
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

