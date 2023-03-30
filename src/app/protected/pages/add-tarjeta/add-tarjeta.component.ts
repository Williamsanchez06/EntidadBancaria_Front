import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardAdd } from 'src/app/auth/interfaces/interfaces';
import Swal from 'sweetalert2';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-add-tarjeta',
  templateUrl: './add-tarjeta.component.html',
  styleUrls: ['./add-tarjeta.component.css']
})
export class AddTarjetaComponent {

  @ViewChild('btnAbrirFormulario') btnAbrirFormulario !: ElementRef;
  @ViewChild('formulario') formulario !: ElementRef;
  @ViewChild('tarjeta') tarjeta !: ElementRef;

  miFormulario : FormGroup = this.fb.group({
    inputNumero      : [  , [ Validators.required, Validators.maxLength(19) ]  ],
    inputNombre      : [  , [ Validators.required , Validators.maxLength(19) ] ],
    mes              : [  , [ Validators.required ] ],
    año              : [  , [ Validators.required ] ],
    ccv              : [  , [ Validators.required ] ], 
  })

  numeroTarjeta : string = '#### #### #### ####';
  nombreTarjeta : string = '#####';
  expiracionMes : string = 'MM';
  expiracionAno : string = 'AA';
  meses : string[] = [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  years : number[] = [];
  ccv   : string = '';

  constructor( private fb : FormBuilder,
              private addCardService : CardService ){}               

  ngOnInit(): void {
    
    const yearActual = new Date().getFullYear();
      for(let i = 2015; i <= yearActual + 8; i++){
          this.years.push(i);  
      }

      this.miFormulario.get('mes')?.valueChanges
        .subscribe( data =>{
          this.expiracionMes = data;
        });

        this.miFormulario.get('año')?.valueChanges
        .subscribe( data =>{
          this.expiracionAno = data.substring(2);
        });
    
  }

  mostrarFrente() {
    const tarjeta = this.tarjeta.nativeElement;
    if(tarjeta.classList.contains('active')){
      tarjeta.classList.remove('active');
    }
  }

  parteTraseraTarjeta() {    
    const tarjeta = this.tarjeta.nativeElement;
    tarjeta.classList.toggle('active');
  }

  abrirFormulario() {

    const btnAbrirFormulario = this.btnAbrirFormulario.nativeElement;
    const formulario = this.formulario.nativeElement;

    btnAbrirFormulario.classList.toggle('active');
    formulario.classList.toggle('active');
    
  }

  inputNumero() {
    const inputNumero = this.miFormulario.controls['inputNumero'].value;
    this.numeroTarjeta = inputNumero.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
    
    //Mostrar Frente de la tarjeta
    this.mostrarFrente();
    
  }

  inputNombre() {
    const inputNombre = this.miFormulario.controls['inputNombre'].value;
    this.nombreTarjeta = inputNombre;

    //Mostrar Frente de la tarjeta
    this.mostrarFrente();
    
  }

  inputCCV() {

    const tarjeta = this.tarjeta.nativeElement;
    if( !tarjeta.classList.contains('active') ){
        tarjeta.classList.add('active');
    }

    const inputCcv = this.miFormulario.controls['ccv'].value;
    this.ccv = inputCcv;
    
  }

  addTarjeta() {

    const { año , ccv, inputNombre, inputNumero, mes } = this.miFormulario.controls;

    const datos : CardAdd = {
      expiracion : `${this.expiracionMes}/${año.value}`,
      ccv : ccv.value,
      nombretarjeta : inputNombre.value,
      numerotarjeta : inputNumero.value,
      mes : mes.value
    }

    this.addCardService.addCard(datos)
        .subscribe( res => {
              console.log(res);
              
            if( res == true  ) {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Tarjeta Asociada Correctamente',
                showConfirmButton: false,
                timer: 1500
              })
            } else {
              Swal.fire({
                title: 'Error',
                text: res,
                icon: 'error',
              })
            }  
            
        });

  }


}
