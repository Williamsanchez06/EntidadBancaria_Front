import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  get usuario() {
    return this.authService.usuario;
  }
  
  get Infocard() {
    return this.cardService.InfoCard;
  }

  constructor( private router: Router, 
               private authService : AuthService,
               private cardService : CardService ) {
                  this.cardService.getInfoCard()
                      .subscribe( console.log )
               }

  logout() {

    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth');
  }

  tieneCardAsociada() {
    if( this.Infocard.numerotarjeta ) {
      return true;
    }
      return false;
}

}
