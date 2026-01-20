import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpCategory {
  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any[]> {
    // return fetch('http://localhost:3000/api/v1/categories');
    return this.http.get<any>('http://localhost:3000/api/v1/categories')
      .pipe(
        // [EDUCATIONAL] Es buena práctica realizar la transformación de datos en el servicio.
        // Aquí extraemos el array 'categories' de la respuesta para que el componente reciba limpio lo que necesita.
        map(response => response.categories),

        // [EDUCATIONAL] catchError intercepta cualquier error en la petición HTTP.
        // Aquí lo capturamos, mostramos un mensaje en consola para debugging,
        // y retornamos un array vacío (of([])) para que la aplicación no se rompa y el selector simplemente aparezca vacío.
        catchError(error => {
          console.error('Error cargando categorías:', error);
          return of([]); // Retorna un Observable con un array vacío como "plan B".
        })
      );
  }
}
