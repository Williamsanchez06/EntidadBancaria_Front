import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/menu/dashboard.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { HistorialMovimientosComponent } from './pages/historial-movimientos/historial-movimientos.component';
import { AddTarjetaComponent } from './pages/add-tarjeta/add-tarjeta.component';
import { ValidarTokenGuard } from '../guards/validar-token.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children : [
      { path: 'home', component : InicioComponent },
      { path: 'añadirCard', component : AddTarjetaComponent },
      { path: 'movimientos', component : HistorialMovimientosComponent },
      { 
        path: 'tipomovimiento',
        loadChildren : () => import('./pages/metodo-movimiento/metodo-movimiento.module').then( m => m.MetodoMovimientoModule),
      },
      { path: '**', redirectTo : 'home'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
