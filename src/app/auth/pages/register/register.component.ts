import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {

  miFormulario : FormGroup = this.fb.group({
    name     : [ '', [ Validators.required ] ],
    email    : [ '', [ Validators.required , Validators.email ] ],
    telefono    : [ '', [ Validators.required , Validators.minLength(10), Validators.maxLength(10) ] ],
    password : [ '', [ Validators.required , Validators.minLength(6)] ],
  })

  constructor( private fb: FormBuilder,
               private router : Router,
               private authService : AuthService ){ }

  register() {

    const { name , email, password, telefono } = this.miFormulario.value;

    this.authService.registrar( name, email, password , telefono)
        .subscribe( res => {
          if ( res === true ) {
            this.router.navigateByUrl('/dashboard');
          } else {
            Swal.fire('Error', res , 'error');
          }
        })
      
  }

}
