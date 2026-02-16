import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpProduct {
  constructor( private http: HttpClient ) {}

  createProduct(productData: any) {
    // Lógica para crear un nuevo producto
    // console.log(productData);
    return this.http.post<any>('http://localhost:3000/api/v1/products', productData);
  }

  getProducts() {
    // Lógica para obtener la lista de productos
    return this.http.get<any>('http://localhost:3000/api/v1/products').pipe(
      map((response: any) => response.products),   // Ajusta esto según la estructura de tu respuesta
      catchError((error) => {
        console.error('Error al obtener productos', error);
        return throwError(() => new Error('Error al obtener productos'));
      })
    );
  }

  updateProduct(id: string|null, productUpdated: any ) {
    return this.http.patch<any>(`http://localhost:3000/api/v1/products/${id}`, productUpdated )
  }

  deleteProduct(id: string) {
    return this.http.delete<any>(`http://localhost:3000/api/v1/products/${id}`);
  }

  getProduct(id: string | null) {
    return this.http.get<any>(`http://localhost:3000/api/v1/products/${id}`);
  }
}
