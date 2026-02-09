import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { HttpCategory } from '../../../../core/services/http-category';

@Component({
  selector: 'app-product-new-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-new-form.html',
  styleUrl: './product-new-form.css',
})
export class ProductNewForm {
  // Atributo para almacenar los datos definen los campos del formulario
  formData!: FormGroup;

  constructor( private httpCategory: HttpCategory ) {
    // Inicializar el formulario con un FormGroup (campos del HTML)
    this.formData = new FormGroup({
      name: new FormControl(''), // Campo para el nombre del producto
      description: new FormControl(''), // Campo para la descripción del producto
      price: new FormControl(0), // Campo para el precio del producto
      stock: new FormControl(1), // Campo para el stock del producto
      category: new FormControl(''), // Campo para la categoría del producto
      type: new FormControl(''), // Campo para el tipo del producto
      status: new FormControl('active'), // Campo para el estado del producto
    });
  }

  // Definir un Hook que me indica cuando se inicializa el componente
  ngOnInit(): void {
    this.httpCategory.getCategories().subscribe({
      next: ( data ) => {
        console.log(data);
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {},
    });
  }
}
