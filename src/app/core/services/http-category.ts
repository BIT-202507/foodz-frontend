import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpCategory {
  constructor(
    private http: HttpClient    // Inyecta HttpClient como dependencia
  ) {}

  createCategory( newCategory: any ) {
    // Consume la API para crear una nueva categoría
    return this.http.post( 'http://localhost:3000/api/v1/categories', newCategory );
  }
}
