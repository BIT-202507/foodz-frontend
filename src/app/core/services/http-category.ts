import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class HttpCategory {
  // Inyección de dependencias usando inject() (Best Practice Modern Angular)
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/v1/categories';

  /**
   * Construye los headers de la petición HTTP.
   * Recupera el token JWT del localStorage para autenticar la petición.
   * @returns HttpHeaders configurados con el token
   */
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('X-Token', token);
    }
    return headers;
  }

  /**
   * Obtiene el listado de categorías desde el backend.
   * Soporta filtrado mediante parámetros opcionales.
   *
   * IMPORTANTE: El backend devuelve un objeto { categories: [...] }, por lo que
   * usamos el operador pipe() y map() de RxJS para transformar la respuesta
   * y devolver directamente el array de categorías.
   *
   * @param params Filtros opcionales (ej: parent_id, level)
   * @returns Observable con array de Categories
   */
  getCategories(params?: any): Observable<Category[]> {
    let httpParams = new HttpParams();
    if (params) {
      // Recorremos los parámetros y los añadimos si tienen valor
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    // Petición GET con tipado de respuesta estricto
    return this.http.get<{ categories: Category[] }>(this.apiUrl, { headers: this.getHeaders(), params: httpParams })
      .pipe(
        // Transformamos { categories: [...] } -> [...]
        map(response => response.categories)
      );
  }

  /**
   * Obtiene una categoría específica por su ID.
   * @param id Identificador único de la categoría
   */
  getCategoryById(id: string): Observable<Category> {
    return this.http.get<{ category: Category }>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.category)
      );
  }

  /**
   * Crea una nueva categoría.
   * @param category Datos de la nueva categoría (Partial permite enviar solo los campos necesarios)
   */
  createCategory(category: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category, { headers: this.getHeaders() });
  }

  /**
   * Actualiza una categoría existente.
   * @param id ID de la categoría a actualizar
   * @param category Datos modificados
   */
  updateCategory(id: string, category: Partial<Category>): Observable<Category> {
    const headers = this.getHeaders();
    const token = localStorage.getItem('token');
    console.log('📤 PATCH Request - ID:', id, 'Data:', category, 'Token exists:', !!token);
    console.log('🔑 Headers being sent:', {
      'X-Token': headers.get('X-Token'),
      'Content-Type': headers.get('Content-Type')
    });

    return this.http.patch<{ category: Category }>(`${this.apiUrl}/${id}`, category, { headers })
      .pipe(
        tap( response => console.log('✅ PATCH Success:', response ) ),
        map(response => response.category),
        catchError( error => {
          console.error(error);
          return of(null as any);
        })
      );
  }

  /**
   * Elimina una categoría.
   * @param id ID de la categoría a eliminar
   */
  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
