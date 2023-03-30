import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CardService } from '../../services/card.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  
  get Infocard() {
    return this.cardService.InfoCard;
  }

  @ViewChild( BaseChartDirective ) chart : BaseChartDirective | undefined;

  constructor( private cardService : CardService ) {
    this.cardService.getInfoCard()
                    .subscribe( console.log );
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public barChartType: ChartType = 'line';

  public barChartData: ChartData<'bar'> = {
    labels: [ '2021', '2022', '2023', '2024', '2025', '2026', '2027' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Historial de Movimientos' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Recargas',  },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Transferencias'}
    ]
  };

  tieneCardAsociada() {
      if( this.Infocard.numerotarjeta ) {
        return true;
      }
        return false;
  }


}
