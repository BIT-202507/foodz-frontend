import { Component } from '@angular/core';
import { HttpProduct } from '../../../../core/services/http-product';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [ AsyncPipe, CurrencyPipe ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {

  // Atributo para almacenar la lista de productos
  public products: Observable<any[]> = new Observable<any[]>();
  // Atributo para controlar la actualización de la lista de productos
  private refreshProductsTrigger$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);

  constructor( private httpProduct: HttpProduct ) {}

  ngOnInit() {
    this.products = this.refreshProductsTrigger$.pipe(
      switchMap(() => this.httpProduct.getProducts())
    );
  }
}
