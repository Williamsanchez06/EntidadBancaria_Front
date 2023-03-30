import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';
import { catchError, map, of, tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl : string = environment.baseUrl;
  private _usuario !: Usuario;

  get usuario() {
    return { ...this._usuario };
  }

  constructor( private http : HttpClient ) { }

  registrar( name : string , email : string , password : string, telefono : string ) {
      const url = `${ this.baseUrl }/auth/new`;
      const body = { name , email , password, telefono };

      return this.http.post<AuthResponse>( url, body )
                  .pipe(
                    tap( resp => {
                      if( resp.ok ){
                        localStorage.setItem('token', resp.token! );
                      }
                    }),
                    map( resp => resp.ok ),
                    catchError( err => of( err.error.msg ) )
                  )

  }

  login( email: string, password: string ) {

    const url = `${ this.baseUrl }/auth`;
    const body = { email, password };

    return this.http.post<AuthResponse>( url , body )
                    .pipe(
                      tap( resp => {                        
                        if( resp.ok ) {
                          localStorage.setItem('token', resp.token! );                         
                        }
                      }),
                      map( resp => resp.ok ),
                      catchError( err => of( err.error.msg ) )
                    );
  }

  validarToken(): Observable<boolean> {
    
    const url = `${ this.baseUrl }/auth/renew`;
    const headers = new HttpHeaders()
          .set( 'x-token', localStorage.getItem( 'token' ) || '' );

    return this.http.get<AuthResponse>( url , { headers } )
                   .pipe(
                      map( resp => {
                        localStorage.setItem('token', resp.token! );
                          this._usuario = {
                            name  : resp.name!,
                            id    : resp.id!,
                            email : resp.email!
                         }
                        return resp.ok;
                      }),
                      catchError( err => of( false ))
                   )

  }




}
