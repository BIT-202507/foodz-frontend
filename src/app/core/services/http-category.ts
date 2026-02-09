import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpCategory {
  constructor( private httpClient: HttpClient ) {}

  getCategories() {
    return this.httpClient.get('http://localhost:3000/api/v1/categories');
  }
}
