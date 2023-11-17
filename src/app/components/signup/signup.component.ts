import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user = {
    username : '',
    password : '',
    name : '',
    lastName : '',
    email : '',
    phoneNumber : ''
  }

  constructor(private userService:UserService, private snack:MatSnackBar) {}

  ngOnInit(): void {

  }

  formSubmit(){
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null){
      this.snack.open('El nombre de usuario es requerido','Aceptar',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right',
      });
      return;
    }
    this.userService.addUser(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Usuario guardado', 'Usuario registrado con exito','success');
      },(error) => {
        console.log(error);
        this.snack.open('Ha ocurrido un error', 'Aceptar',{
          duration : 3000
        });
      }
    )
  }

}
