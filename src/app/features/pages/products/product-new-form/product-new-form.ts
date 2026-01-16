import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpCategory } from '../../../../core/services/http-category';
import { LowerCasePipe } from '@angular/common';
import { HttpProduct } from '../../../../core/services/http-product';

@Component({
  selector: 'app-product-new-form',
  imports: [ReactiveFormsModule, LowerCasePipe],
  templateUrl: './product-new-form.html',
  styleUrl: './product-new-form.css',
})
export class ProductNewForm {
  edad: number = 0;   // Inferencia
  categories: any[] = [];
  types: string[] = ['Dish', 'Ingredient', 'Addon'];

  // Atributo para almacenar los datos del formulario
  public formData!: FormGroup;

  constructor(
    private httpCategory: HttpCategory,
    private httpProduct: HttpProduct
  ) {
    // Definido el formulario
    this.formData = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      category: new FormControl(''),
      type: new FormControl(''),
      price: new FormControl(0),
      image_url: new FormControl(''),
      stock: new FormControl(0),
      status: new FormControl('active'),
    });
  }

  onSubmit() {
    // Lógica para manejar el envío del formulario
    // console.log(this.formData.value);
    // TODO: Cambiar el Callback por el objeto Observable
    this.httpProduct.createProduct(this.formData.value).subscribe( (response) => {
      console.log('Producto creado:', response);
    });
  }

  // Life Cicle Hooks
  ngOnInit(): void {
    // Lógica a ejecutar al inicializar el componente, solicita de datos, etc.
    // console.log('ngOnInit');
    // TODO: Cambiar el Callback por el objeto Observable
    this.httpCategory.getAllCategories().subscribe( (data: any) => {
      console.log(data.categories);
      this.categories = data.categories;
    });
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
