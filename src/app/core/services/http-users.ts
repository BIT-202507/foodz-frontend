import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpUsers {
  constructor( private paquita: HttpClient) {}

  createUser( user: any ) {
    // En el futuro vamos a tener que enviar aqui el token para que el backend me autorice a realiar esta accion
    return this.paquita.post('http://localhost:3000/api/v1/users', user);
  }
}
