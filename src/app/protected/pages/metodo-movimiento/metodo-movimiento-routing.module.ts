import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { metodoHomeComponent } from './metodo-home/metodo.component';
import { MetodoEnviarComponent } from './metodo-enviar/metodo-enviar.component';
import { MetodoRecargarComponent } from './metodo-recargar/metodo-recargar.component';

const routes: Routes = [
  {
    path: '',
    component : metodoHomeComponent,    
  },
  {
    path: 'transferirFondo',
    component : MetodoEnviarComponent
  },
  {
    path: 'recargarCuenta',
    component : MetodoRecargarComponent
  },
  {
    path: '**' , redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class MetodoMovimientoRoutingModule { }