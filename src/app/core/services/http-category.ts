   import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpCategory {
  constructor( private http: HttpClient ) {}

  getAllCategories(): Observable<any> {
    // return fetch('http://localhost:3000/api/v1/categories');
    return this.http.get<any>('http://localhost:3000/api/v1/categories').pipe(
      tap( data => console.log( data) ),
      map( response => response.categories )
    );
​​​
  }
}
