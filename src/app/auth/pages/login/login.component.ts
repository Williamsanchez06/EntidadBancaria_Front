import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

    miFormulario : FormGroup = this.fb.group({
      email:    [ 'testse@correo.com' , [ Validators.required, Validators.email ]],
      password: [ '123456' , [ Validators.required, Validators.minLength(6) ]]
    });

    constructor( private fb: FormBuilder, 
                 private router : Router,
                 private authService : AuthService ){}

    login() {

      const { email , password } = this.miFormulario.value;

      this.authService.login( email , password )
          .subscribe( res => {
            if ( res === true ) {
              this.router.navigateByUrl('/dashboard');
            } else {
              //Mostrar mensaje de error
              Swal.fire('Error', res , 'error');
            }
          });

    }

}