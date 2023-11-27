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

  constructor(private userService:UserService, 
              private snack:MatSnackBar) {}

  ngOnInit(): void {

  }

  formSubmit(){
    console.log(this.user);
    const requiredFields: Array<keyof typeof this.user> = ['username', 'password', 'name', 'lastName', 'email', 'phoneNumber'];
    const fieldNames = {
      username: 'nombre de usuario',
      password: 'contraseña',
      name: 'nombre',
      lastName: 'apellido',
      email: 'correo electronico',
      phoneNumber: 'número telefónico',
    }

    for (const field of requiredFields) {
      if (!this.user[field] || (typeof this.user[field] === 'string' && this.user[field].trim() === '')) {
        this.snack.open('El campo ' + fieldNames[field] + ' es requerido.', 'Aceptar', {
          duration : 3000,
          verticalPosition: 'top',
          horizontalPosition : 'right',
        });
        return;
      }
    }
    this.userService.addUser(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Usuario guardado', 'Usuario registrado con exito','success');
      },(error) => {
        console.log(error);
        this.snack.open('Ha ocurrido un error en el sistema.', 'Aceptar',{
          duration : 3000
        });
      }
    )
  }

}
