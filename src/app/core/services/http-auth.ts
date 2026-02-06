import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpAuth {
  constructor( private http: HttpClient ) {}

  register(credentials: { name: string, username: string, email: string; password: string }) {
    return this.http.post('http://localhost:3000/api/v1/auth/register', credentials);
  }

  login( credentials: { email: string; password: string } ) {
    return this.http.post<{user: any, token: string}>('http://localhost:3000/api/v1/auth/login', credentials);
  }

  saveLocalStorageData( token: string, userData: any ) {
    localStorage.setItem( 'token', token );                     // Token storage
    localStorage.setItem( 'user', JSON.stringify( userData ) ); // User data storage
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
