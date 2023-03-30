import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EnviarDinero, RecargarCuenta } from '../../../../auth/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TipoMovimientoService {

  private baseUrl : string = environment.baseUrl;

  constructor( private http : HttpClient ) { }

  EnviarDinero( objectEnviarDinero : EnviarDinero ) {
   
    const url = `${this.baseUrl}/dashboard/usuario/trasnferirfondo`;
    const headers = new HttpHeaders()
                    .set( 'x-token', localStorage.getItem( 'token' ) || '' );

      return this.http.post<EnviarDinero>( url , objectEnviarDinero , { headers } )
      .pipe(
        map( resp => resp.ok ),
        catchError( err => of( err.error ) )
      )
  }

  recargarCuenta( objectEnviarDinero : RecargarCuenta ) {
    const url = `${this.baseUrl}/dashboard/usuario/recargarcuenta`;
    const headers = new HttpHeaders()
                    .set( 'x-token', localStorage.getItem( 'token' ) || '' );

      return this.http.post<RecargarCuenta>( url , objectEnviarDinero , { headers } )
      .pipe(
        map( resp => resp.ok ),
        catchError( err => of( err.error ) )
      )
  }

}