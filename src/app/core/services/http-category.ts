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
      map( response => {
        return response.categories
            .filter( (cat: any) => cat.parent_id == null )
            .map( (cat: any) => ({
              _id: cat._id,
              childrenCount: cat.childrenCount,
              createdAt: cat.createdAt,
              description: cat.description,
              isActive: cat.isActive,
              level: cat.level,
              name: 'Corozo',
              parent_id: cat.parent_id,
              slug: cat.slug,
              updatedAt: cat.updatedAt
            }) )
      } ),   // []
      tap( data => console.log( 'Filtered categories', data) )
    );
​​​
  }
}
