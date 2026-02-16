import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, JsonPipe, LowerCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { HttpProduct } from '../../../../core/services/http-product';
import { HttpCategory } from '../../../../core/services/http-category';
@Component({
  selector: 'app-product-new-form',
  imports: [ReactiveFormsModule, LowerCasePipe, AsyncPipe],
  templateUrl: './product-new-form.html',
  styleUrl: './product-new-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,    // Estrategia de detección de cambios: verifica cuando los valores de las propiedades del clase del componente, vinculadas a datos cambian.
})
export class ProductNewForm {   // Estrategia de detección de cambios: verifica cuando
  categories!: Observable<any[]>;   // Antes: categories: any[] = [];
  types: string[] = ['Dish', 'Ingredient', 'Addon'];

  // Atributo para almacenar los datos del formulario
  public formData!: FormGroup;

  constructor(
    private httpCategory: HttpCategory,
    private httpProduct: HttpProduct,
    private router: Router
  ) {
    // Definido el formulario
    this.formData = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl(''),
      category: new FormControl('', [Validators.required] ),
      type: new FormControl('dish', [Validators.required] ),
      price: new FormControl(0, [Validators.required, Validators.min(0)] ),
      image_url: new FormControl('', [Validators.required, Validators.minLength(10)] ),
      stock: new FormControl(0, [Validators.required, Validators.min(1)] ),
      status: new FormControl('active'),
    });
  }

  onSubmit() {
    // Verifica que el formulario sea válido antes de enviarlo
    if( this.formData.valid ) {
      // Lógica para manejar el envío del formulario
      console.log('Envia estos datos al servicio', this.formData.value);
      // Cambiar el Callback por el objeto Observable
      this.httpProduct.createProduct(this.formData.value).subscribe({
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

  onReset() {
    // Establecer los valores iniciales del formulario
    this.formData.setValue({
      name: '',
      description: '',
      category: '',
      type: 'dish',
      price: 0,
      image_url: '',
      stock: 0,
      status: 'active',
    });
  }

  // Life Cicle Hooks
  ngOnInit(): void {
    // Lógica a ejecutar al inicializar el componente, solicita de datos, etc.
    // console.log('ngOnInit');
    // Cambiar el Callback por el objeto Observable
    this.categories = this.httpCategory.getCategories();
    // { categories: []}
  }
  ngOnChanges(): void {
    // Lógica a ejecutar cuando cambian las propiedades vinculadas a datos
    console.log('ngOnChanges')
  }
  ngOnDestroy(): void {
    // Lógica a ejecutar cuando se destruye el componente
    console.log('ngOnDestroy')
  }
  ngDoCheck(): void {
    // Lógica a ejecutar en cada ciclo de detección de cambios
    console.log('ngDoCheck')
  }
  ngAfterContentInit(): void {
    // Lógica a ejecutar después de inicializar el contenido del componente
    console.log('ngAfterContentInit')
  }
  ngAfterContentChecked(): void {
    // Lógica a ejecutar después de verificar el contenido del componente
    console.log('ngAfterContentChecked')
  }
  ngAfterViewInit(): void {
    // Lógica a ejecutar después de inicializar las vistas del componente
    console.log('ngAfterViewInit')
  }
  ngAfterViewChecked(): void {
    // Lógica a ejecutar después de verificar las vistas del componente
    console.log('ngAfterViewChecked')
  }
}
