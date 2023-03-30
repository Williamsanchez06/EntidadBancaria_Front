import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table'
import { HistorialMovimientos } from '../../../auth/interfaces/interfaces';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-historial-movimientos',
  templateUrl: './historial-movimientos.component.html',
  styleUrls: ['./historial-movimientos.component.css']
})
export class HistorialMovimientosComponent implements OnInit  {
  
  historialMovimientos : HistorialMovimientos[] = [];

  displayedColumns: string[] = ['fecha', 'name', 'tipo_movimiento', 'monto'];
  dataSource = new MatTableDataSource( this.historialMovimientos );

  @ViewChild( MatPaginator ) paginator !: MatPaginator;

  ngOnInit() {
      this.cardService.getHistorialMovimientos()
                .subscribe(resp =>{
                    this.historialMovimientos = resp;
                    this.dataSource = new MatTableDataSource( this.historialMovimientos ); 
                    this.dataSource.paginator = this.paginator;                      
                })
  }

  constructor( private cardService : CardService ) { }


}