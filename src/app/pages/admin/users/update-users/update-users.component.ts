import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.css']
})
export class UpdateUsersComponent implements OnInit {

  userId: any;
  user: any = {};

  constructor(private route:ActivatedRoute,
              private userService:UserService,
              private router:Router
              ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.userService.getUser(this.userId).subscribe(
      (data: any) => {
      this.user = data;
      console.log(this.user);
    },
    (error) => {
      console.log(error);
    });
  }

  updateUser() {
    this.userService.updateUser(this.userId, this.user).subscribe(
      (data) => {
        Swal.fire('Usuario actualizado', 'El usuario ha sido actualizado con éxito', 'success').then(
          (e) => {
            this.router.navigate(['/admin/view-users']);
          }
        );
    },
    (error) => {
      Swal.fire('Error en el sistema', 'No se ha podido actualizar el usuario', 'error');
      console.log(error);
    })
  }

}
