import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetodoMovimientoRoutingModule } from './metodo-movimiento-routing.module';
import { metodoHomeComponent } from './metodo-home/metodo.component';
import { MetodoEnviarComponent } from './metodo-enviar/metodo-enviar.component';
import { MetodoRecargarComponent } from './metodo-recargar/metodo-recargar.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    metodoHomeComponent,
    MetodoEnviarComponent,
    MetodoRecargarComponent
  ],
  imports: [
    CommonModule,
    MetodoMovimientoRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ]
})
export class MetodoMovimientoModule { }
