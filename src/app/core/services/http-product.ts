import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpProduct {
  constructor( private httpClient: HttpClient ) {}

  createProduct() {}
}
