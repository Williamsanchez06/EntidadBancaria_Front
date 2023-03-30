import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './pages/menu/dashboard.component';
import { HistorialMovimientosComponent } from './pages/historial-movimientos/historial-movimientos.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AddTarjetaComponent } from './pages/add-tarjeta/add-tarjeta.component';
import { NgChartsModule } from 'ng2-charts';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    DashboardComponent,
    HistorialMovimientosComponent,
    InicioComponent,
    AddTarjetaComponent,
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    ReactiveFormsModule,
    NgChartsModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class ProtectedModule { }
