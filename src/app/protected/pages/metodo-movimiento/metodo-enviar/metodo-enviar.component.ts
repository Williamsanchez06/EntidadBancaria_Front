import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoMovimientoService } from '../services/tipo-movimiento.service';

@Component({
  selector: 'app-metodo-enviar',
  templateUrl: './metodo-enviar.component.html',
  styleUrls: ['./metodo-enviar.component.css']
})
export class MetodoEnviarComponent {

  miFormulario : FormGroup = this.fb.group({
      numTarjeta : [ , [ Validators.required, Validators.minLength(16) ]  ],
      telefono   : [ , [ Validators.required, Validators.minLength(10) ]  ],
      monto      : [ , [ Validators.required ]  ],
      password   : [ , [ Validators.required, Validators.minLength(6) ]  ]
  })

  constructor( private fb : FormBuilder,
               private tipoMovimiento : TipoMovimientoService
             ){}

  enviarDinero() {

    // const formatterPeso = new Intl.NumberFormat('es-CO', {
    //     // style: 'currency',
    //     currency: 'COP',
    //     minimumFractionDigits: 0
    // })

    const numerotarjetadest = this.miFormulario.controls['numTarjeta'].value;
    const telefono = this.miFormulario.controls['telefono'].value;
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

    const objectEnviar = {
      numerotarjetadest,
      telefono,
      monto: Number(monto),
      password,
      fecha : fechaYHora
    }
    

    this.tipoMovimiento.EnviarDinero( objectEnviar )
                       .subscribe( console.log );

  }



}