import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TipoMovimientoService } from '../services/tipo-movimiento.service';

@Component({
  selector: 'app-metodo-recargar',
  templateUrl: './metodo-recargar.component.html',
  styleUrls: ['./metodo-recargar.component.css']
})
export class MetodoRecargarComponent {

  miFormulario : FormGroup = this.fb.group({
    monto      : [ , [ Validators.required ] ],
    password   : [ , [ Validators.required, Validators.minLength(6) ]  ]
  })

  constructor( private fb: FormBuilder,
               private tipoMovimiento : TipoMovimientoService
             ){}    

  recargarCuenta(){ 

    const monto = this.miFormulario.controls['monto'].value;
    const password = this.miFormulario.controls['password'].value;

    const hoy = new Date();

    let day   = hoy.getDate();
    let month = hoy.getMonth() + 1;
    let year  = hoy.getFullYear();
    let fecha;
    
    if( month < 10 ) {
        fecha = `${ day }/0${ month }/${ year }`;
    } else {
        fecha = `${ day }/${ month }/${ year }`;
    }

    const hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    const fechaYHora = fecha + ' ' + hora;

    const objetoRecargarCuenta = {
        monto : Number(monto),
        password,
        fecha : fechaYHora
    }
    
    this.tipoMovimiento.recargarCuenta(objetoRecargarCuenta)
                       .subscribe( console.log );

  }

}
