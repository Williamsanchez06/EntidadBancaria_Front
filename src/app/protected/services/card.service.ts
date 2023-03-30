import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, CardAdd, HistorialMovimientos, InfoCard } from '../../auth/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private baseUrl : string = environment.baseUrl;
  private _InfoCard !: InfoCard;
  // private _historialMovimientos : HistorialMovimientos[] = [];

  get InfoCard() {
    return { ...this._InfoCard };
  }

  // get historialMovimientos() {
  //   return { ...this._historialMovimientos };
  // }

  constructor( private http : HttpClient ) { }

  addCard( datos : CardAdd ) {
      
      const url =  `${ this.baseUrl }/dashboard/usuario/add-card`;
      const headers = new HttpHeaders()
        .set( 'x-token', localStorage.getItem( 'token' ) || '' );
      
        return this.http.post<AuthResponse>( url , datos , { headers } )
              .pipe(
                map( resp => resp.ok ),
                catchError( err => of( err.error.msg ) )
              )
  }

  getInfoCard() {

    const url =  `${ this.baseUrl }/dashboard/usuario/home`;

    const headers = new HttpHeaders()
    .set( 'x-token', localStorage.getItem( 'token' ) || '' );

    return this.http.get<InfoCard>( url , { headers } )
              .pipe(
                map( resp => {
                  this._InfoCard = {
                    monto : resp.monto,
                    numerotarjeta : resp.numerotarjeta,
                    nombretarjeta : resp.nombretarjeta,
                    expiracion : resp.expiracion
                  }

                  return resp.ok;
                }),
                catchError( err => of( false ) )
              )

  }

  getHistorialMovimientos() {

    const url =  `${ this.baseUrl }/dashboard/usuario/historialmovimientos`;

    const headers = new HttpHeaders()
    .set( 'x-token', localStorage.getItem( 'token' ) || '' );

    return this.http.get<HistorialMovimientos>( url , { headers } )
              .pipe(
                map( resp => {
                    return resp;
                }),
                catchError( err => [err])
              )

  }
  
}
