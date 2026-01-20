import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpCategory } from '../../../../core/services/http-category';
// [EDUCATIONAL] Se importa AsyncPipe para manejar Observables directamente en la plantilla.
// Esto es clave para la estrategia OnPush ya que maneja la suscripción y la detección de cambios automáticamente.
import { JsonPipe, LowerCasePipe, AsyncPipe } from '@angular/common';
import { HttpProduct } from '../../../../core/services/http-product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-new-form',
  imports: [ReactiveFormsModule, LowerCasePipe, JsonPipe, AsyncPipe],
  templateUrl: './product-new-form.html',
  styleUrl: './product-new-form.css',
  // [EDUCATIONAL] ChangeDetectionStrategy.OnPush:
  // Le dice a Angular que verifique este componente SOLO cuando:
  // 1. Las propiedades de entrada (Input) cambian.
  // 2. Un evento se origina desde este componente o sus hijos.
  // 3. Un Observable con el AsyncPipe emite un nuevo valor.
  // Esto es más eficiente que la estrategia por defecto y soluciona nuestro problema de actualización fuera de zona ("zoneless").
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductNewForm {
  edad: number = 0;   // Inferencia

  // [EDUCATIONAL] Cambiado de 'categories: any[]' a 'Observable<any[]>'.
  // Ahora mantenemos un flujo de datos (Observable) en lugar de los datos en sí.
  // El '!' indica que será asignado antes de su uso (en ngOnInit).
  categories!: Observable<any[]>;

  types: string[] = ['Dish', 'Ingredient', 'Addon'];

  // Atributo para almacenar los datos del formulario
  public formData!: FormGroup;

  constructor(
    private httpCategory: HttpCategory,
    private httpProduct: HttpProduct
  ) {
    // Definido el formulario
    this.formData = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl(''),
      category: new FormControl('', [Validators.required]),
      type: new FormControl('dish', [Validators.required]),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
      image_url: new FormControl('', [Validators.required, Validators.minLength(10)]),
      stock: new FormControl(0, [Validators.required, Validators.min(1)]),
      status: new FormControl('active'),
    });
  }

  onSubmit() {
    // Verifica que el formulario sea válido antes de enviarlo
    if (this.formData.valid) {
      // Lógica para manejar el envío del formulario
      console.log('Envia estos datos al servicio', this.formData.value);
      // Cambiar el Callback por el objeto Observable
      this.httpProduct.createProduct(this.formData.value).subscribe({
        next: (data) => {
          console.log('Crea producto exitosamente', data);
        },
        error: (err) => {
          console.error('Error al crear el producto', err);
        },
        complete: () => {
          console.log('Solicitud de creación de producto completada');
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

    // [EDUCATIONAL] VERSIÓN ANTERIOR (Imperativa):
    // this.httpCategory.getAllCategories().subscribe(data => this.categories = data);
    //
    // NUEVA VERSIÓN (Reactiva Refactorizada):
    // Asignamos el Observable directamente.
    // 1. NO nos suscribimos aquí (.subscribe()).
    // 2. La plantilla se suscribe AUTOMÁTICAMENTE usando el pipe 'async'.
    // 3. Cuando el componente se destruye, el 'async' se desuscribe AUTOMÁTICAMENTE (evitando memory leaks).
    this.categories = this.httpCategory.getAllCategories();
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
