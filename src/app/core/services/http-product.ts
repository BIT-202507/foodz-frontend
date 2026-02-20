import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { HttpAuth } from './http-auth';

@Injectable({
  providedIn: 'root',
})
export class HttpProduct {

  constructor(
    private http: HttpClient,
    private httpAuth: HttpAuth
  ) {}

  createProduct(productData: any) {
    console.info( 'Headers', this.httpAuth.getHeaders() );

    // Lógica para crear un nuevo producto
    // console.log(productData);
    return this.http.post<any>('http://localhost:3000/api/v1/products', productData, { headers: this.httpAuth.getHeaders() } );
  }

  getProducts() {
    // Lógica para obtener la lista de productos
    return this.http.get<any>('http://localhost:3000/api/v1/products', { headers: this.httpAuth.getHeaders() }).pipe(
      map((response: any) => response.products),   // Ajusta esto según la estructura de tu respuesta
      catchError((error) => {
        console.error('Error al obtener productos', error);
        return throwError(() => new Error('Error al obtener productos'));
      })
    );
  }

  updateProduct(id: string|null, productUpdated: any ) {
    return this.http.patch<any>(`http://localhost:3000/api/v1/products/${id}`, productUpdated, { headers: this.httpAuth.getHeaders() } );
  }

  deleteProduct(id: string) {
    return this.http.delete<any>(`http://localhost:3000/api/v1/products/${id}`, { headers: this.httpAuth.getHeaders() });
  }

  getProduct(id: string | null) {
    return this.http.get<any>(`http://localhost:3000/api/v1/products/${id}`, { headers: this.httpAuth.getHeaders() });
  }
}
