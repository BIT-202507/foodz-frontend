import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpProduct } from '../../../../core/services/http-product';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpCategory } from '../../../../core/services/http-category';
import { AsyncPipe, LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-edit-form',
  imports: [ReactiveFormsModule, LowerCasePipe, AsyncPipe],
  templateUrl: './product-edit-form.html',
  styleUrls: ['./product-edit-form.css'],
})
export class ProductEditForm {
  private getProductSubscription!: Subscription;
  private updatedProductSubscription!: Subscription;
  // Suscripción que escucha los cambios en los valores del formulario para
  // detectar cuando el usuario modifica algún campo. Guardamos una referencia
  // para poder cancelar la suscripción en `onDestroy` y así evitar fugas de
  // memoria.
  private formChangesSubscription!: Subscription;

  private productId!: string | null;
  public formData!: FormGroup;
  public productOriginal!: any;
  public productCurrent!: any;
  public formChanged: boolean = false; // Indica si los valores del formulario cambiaron respecto a `productSelected`

  categories!: Observable<any[]>;                     // Antes: categories: any[] = [];
  types: string[] = ['Dish', 'Ingredient', 'Addon'];

  constructor(
    private route: ActivatedRoute,
    private httpProduct: HttpProduct,
    private httpCategory: HttpCategory,
    private router: Router
  ) {
    this.formData = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl(''),
      category: new FormControl(null, [Validators.required] ),
      type: new FormControl('dish', [Validators.required] ),
      price: new FormControl(0, [Validators.required, Validators.min(0)] ),
      image_url: new FormControl('', [Validators.required, Validators.minLength(10)] ),
      stock: new FormControl(1, [Validators.required, Validators.min(1)] ),
      status: new FormControl('active'),
    });
  }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');

    if(!this.productId) {
      this.router.navigateByUrl('/dashboard/products');
      return;
    }

    this.onSearchProductById( this.productId );
    this.categories = this.httpCategory.getCategories();

    this.formChangesSubscription = this.formData.valueChanges.subscribe(() => {
      if (!this.productOriginal) {
        // Aún no hay un producto original con el que comparar.
        this.formChanged = false;
        return;
      }

      // Actualizar los valores actuales del formulario cada vez que cambia
      this.productCurrent = this.formData.getRawValue();

      // Actualizar la bandera: true si algún valor normalizado difiere del
      // snapshot original, false en caso contrario.
      this.formChanged = JSON.stringify(this.productCurrent) !== JSON.stringify(this.productOriginal);
    });
  }

  onSearchProductById(id: string) {
    this.getProductSubscription = this.httpProduct.getProduct( id ).subscribe({
      next: ( data ) => {
        // console.log( data );
        const { product } = data;
        this.onLoadFormData( product );
      },
      error: ( error ) => {
        console.error(error);
      },
      complete: () => {}
    });
  }

  onLoadFormData( productData: any ) {
    const { name, description, category, type, price, image_url, stock, status } = productData;

    this.productOriginal = {
      name,
      description,
      category: this.onGetTheCategoryId( category ),
      type,
      price,
      image_url,
      stock,
      status
    };

    this.formData.patchValue({
      name,
      description,
      category: this.onGetTheCategoryId( category ),
      type,
      price,
      image_url,
      stock,
      status,
    });

    // Tras cargar los valores iniciales en el formulario, debemos asegurar que
    // la bandera `formChanged` se reinicie a false, porque los valores cargados
    // representan el estado original del producto. Esto evita que la UI piense
    // que el formulario fue modificado inmediatamente después de la carga.
    this.formChanged = false;
  }

  onGetTheCategoryId( category: any ) {
    // Verificar que el control de categoría almacene el _id de la categoría (cadena)
    return category && typeof category === 'object' ? category._id : category;
  }

  onSubmit() {
    if( this.formData.valid ) {
      // Lógica para manejar el envío del formulario
      console.log('Envia estos datos al servicio', this.formData.value);
      if(!this.productId) {
        console.error('No product id available for update');
        return;
      }
      // Cambiar el Callback por el objeto Observable
      this.updatedProductSubscription = this.httpProduct.updateProduct(this.productId, this.formData.value).subscribe({
        next: ( data ) => {
          console.log( 'Crea producto exitosamente', data );

          this.formData.reset(); // Reiniciar el formulario después de la creación exitosa
          this.router.navigate(['/dashboard/products']);  // Navigate to dashboard after login
        },
        error: ( err ) => {
          console.error( 'Error al crear el producto', err );
        },
        complete: () => {
          console.log( 'Solicitud de creación de producto completada' );
          this.formData.reset(); // Reiniciar el formulario después de la creación exitosa
        }
      });
    } else {
      console.error('Formulario no válido');
      // Marcar todos los campos como tocados para mostrar los errores de validación
      // this.formData.markAllAsTouched();
    }
  }

  onRestore() {
    this.formData.patchValue(this.productOriginal);
  }

  onDestroy() {
    // Limpiar la suscripción que escucha los cambios del formulario para evitar fugas de memoria.
    if(this.getProductSubscription) {
      this.getProductSubscription.unsubscribe();
    }
    if(this.updatedProductSubscription) {
      this.updatedProductSubscription.unsubscribe();
    }
    if (this.formChangesSubscription) {
      this.formChangesSubscription.unsubscribe();
    }
  }
}
