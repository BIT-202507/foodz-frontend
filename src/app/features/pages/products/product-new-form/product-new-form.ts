import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-new-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-new-form.html',
  styleUrl: './product-new-form.css',
})
export class ProductNewForm {
  // Atributo para almacenar los datos del formulario
  formData!: FormGroup;

  constructor() {
    // Definido el formulario
    this.formData = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      category: new FormControl(''),
      type: new FormControl(''),
      price: new FormControl(0),
      image_url: new FormControl(''),
      stock: new FormControl(0),
      status: new FormControl(''),
    });
  }

  onSubmit() {
    // Lógica para manejar el envío del formulario
    console.log(this.formData.value);
  }
}
