import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }

  mensajeGuardar(): void{
    Swal.fire(
      'Grabado!',
      'Tus datos están grabados!',
      'success'
    )
  }

  mensajeActualizar(): void{
    Swal.fire(
      'Actualizados!',
      'Tus datos están actualizados!',
      'success'
    )
  }

  mensajeEliminar(): void{
    Swal.fire(
      'Eliminado!',
      'El Registro ha sido ELIMINADO!',
      'success'
    )
  }
  mensajeError() : void{
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Menor de Edad no puede participar de la subasta'
    })
  } 


  mensajeBajo() : void{
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se puede ofrecer menor a lo ofertado'
    })
  } 
}
