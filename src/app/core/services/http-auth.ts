import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';

import { User } from '../interfaces/user';
import { ResponseLogin } from '../interfaces/response-login';

@Injectable({
  providedIn: 'root',
})
export class HttpAuth {
  // 1.  BehaviorSubject para manejar los datos del usuario y el token (Fuente de persistencia de datos)
  private currentUser = new BehaviorSubject<null|Partial<User>>(null);
  private currentToken = new BehaviorSubject<null|string>(null);

  // 2. Definir el Observable para datos actuales
  public currentUser$ = this.currentUser.asObservable();
  public currentToken$ = this.currentToken.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Inicializar los datos del usuario y el token desde el local storage si existen (Esto asegura persistencia al recargar la página)
    this.getLocalStorageData();
  }

  register(credentials: Partial<User> ): Observable<Partial<User>> {
    return this.http.post<Partial<User>>('http://localhost:3000/api/v1/auth/register', credentials);
  }

  login( credentials: Partial<User> ): Observable<ResponseLogin> {
    return this.http.post<ResponseLogin>('http://localhost:3000/api/v1/auth/login', credentials)
      .pipe(
        tap( data => {
          // Verifico que la respuesta contenga token y user
          if( data.token && data.user ) {
            this.currentToken.next( data.token );
            this.currentUser.next( data.user );
            this.saveLocalStorageData( data.token, data.user );   // Save token and user data to local storage
            this.router.navigate(['/dashboard']);                 // Redirect to dashboard after successful login
          }
        })
      );
  }

  saveLocalStorageData( token: string, userData: any ) {
    localStorage.setItem( 'token', token );                     // Token storage
    localStorage.setItem( 'user', JSON.stringify( userData ) ); // User data storage
    this.currentToken.next( token );
    this.currentUser.next( userData );
  }

  getLocalStorageData() {
    const token = localStorage.getItem('token');
    this.currentToken.next( token ? token : null );

    const user = localStorage.getItem('user');
    this.currentUser.next( user ? JSON.parse(user) : null );

    return {
      token, user
    }
  }

  clearLocalStorageData() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentToken.next(null);
    this.currentUser.next(null);
  }

  logout() {
    this.clearLocalStorageData();
    this.router.navigate(['/login']);
  }

  checkAuthStatus() : Observable<boolean> {
    // Paso 1: Verificar si el token existe en el local storage y obtenerlo
    const { token } = this.getLocalStorageData();       // Desestructurar los datos obtenidos del local storage (token)

    // Responder al cliente si no existe el token (false) o si existe (true)
    if( ! token ) {
      this.clearLocalStorageData();  // Limpiar cualquier dato residual en caso de que el token no exista
      return of(false);                  // Bloquea el flujo de la logica del algoritmo
    }

    // Paso 2: Crear el encabezado con el nombre del campo que va a contener el token que sera enviado al Backend
    const headers = new HttpHeaders().set( 'X-Token', token );

    // Paso 3: Realizar una solicitud al backend para validar el token (Endpoint de validación de token)
    return this.http.get<any>('http://localhost:3000/api/v1/auth/renew-token', { headers }).pipe(
      map( ( response ) => {
        if( !response.token && !response.user ) {
          return false;           // Bloquea el acceso a la ruta (Siempre lo retorna dentro de un Observable)
        }

        this.saveLocalStorageData(response.token, response.user );    // Actualiza los datos en el localStorage
        return true;              // Permite el acceso a la ruta (Siempre lo retorna dentro de un Observable)
      } ),
      catchError( ( error ) => {
        console.error( 'ERROR: ', error  );
        return of( false );
      })
    );
  }

  getHeaders(): any {
    // Paso 1: Verificar si el token existe en el local storage y obtenerlo
    const { token } = this.getLocalStorageData();       // Desestructurar los datos obtenidos del local storage (token)

    // Responder al cliente si no existe el token (false) o si existe (true)
    if( ! token ) {
      this.clearLocalStorageData();  // Limpiar cualquier dato residual en caso de que el token no exista
      return of(false);                  // Bloquea el flujo de la logica del algoritmo
    }

    // Paso 2: Crear el encabezado con el nombre del campo que va a contener el token que sera enviado al Backend
    return new HttpHeaders().set( 'X-Token', token );
  }

}
