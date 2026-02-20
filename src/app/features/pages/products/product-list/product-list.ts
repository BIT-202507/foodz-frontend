import { Component, inject } from '@angular/core';
import { HttpProduct } from '../../../../core/services/http-product';
import { BehaviorSubject, firstValueFrom, Observable, Subscription, switchMap } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpAuth } from '../../../../core/services/http-auth';

@Component({
  selector: 'app-product-list',
  imports: [AsyncPipe, CurrencyPipe, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export default class ProductList {
  private deleteProductSubscription!: Subscription;

  // Atributo para almacenar la lista de productos
  public products: Observable<any[]> = new Observable<any[]>();
  // Atributo para controlar la actualización de la lista de productos
  private refreshProductsTrigger$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);

  private httpAuth = inject(HttpAuth);
  public user = firstValueFrom(this.httpAuth.currentUser$);    // Convertimos el Observable en una Promesa

  constructor(
    private httpProduct: HttpProduct,
    private router: Router
  ) { }

  ngOnInit() {
    this.products = this.refreshProductsTrigger$.pipe(
      switchMap(() => this.httpProduct.getProducts())
    );
  }

  onEdit(id: string) {
    this.router.navigateByUrl(`/dashboard/product/edit/${id}`);
  }

  onDelete(id: string) {
    this.deleteProductSubscription = this.httpProduct.deleteProduct(id).subscribe({
      next: (data) => {
        console.log(data);
        this.refreshProductsTrigger$.next();
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => { }
    });
  }

  ngOnDestroy() {
    if (this.deleteProductSubscription) {
      this.deleteProductSubscription.unsubscribe();
    }
  }
}
