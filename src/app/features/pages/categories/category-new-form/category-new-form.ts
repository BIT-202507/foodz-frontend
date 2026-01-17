import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpCategory } from '../../../../core/services/http-category';

@Component({
  selector: 'app-category-new-form',
  imports: [ReactiveFormsModule],
  templateUrl: './category-new-form.html',
  styleUrl: './category-new-form.css',
})
export class CategoryNewForm {
  formCategory!: FormGroup;

  constructor(
    private httpCategory: HttpCategory    // Inyecta como dependenacia el servicio HttpCategory
  ) {
    // Definir la estructura de campos y lógica del formulario aquí
    this.formCategory = new FormGroup({
      name: new FormControl('', [Validators.required] ),
      description: new FormControl(''),
    });
  }

  onSumit() {

    if (this.formCategory.valid) {
      // Lógica para manejar el envío del formulario
      console.log(this.formCategory.value);

      // Llama al servicio para crear una nueva categoría usando un objeto observador
      this.httpCategory.createCategory(this.formCategory.value).subscribe({
        // Esta acción se ejecuta cuando se recibe una respuesta exitosa
        next: ( data ) => {
          console.log(data);
        },
        // Esta acción se ejecuta cuando ocurre un error
        error: ( err ) => {
          console.error( err )
        },
        // Esta acción se ejecuta al finalizar la petición, sea exitosa o con error
        complete: () => {
          this.formCategory.reset();
        }
      });

      // console.group( 'Estados del formulario' );
      // console.log( 'Valid:', this.formCategory.valid );
      // console.log( 'Invalid:', this.formCategory.invalid );
      // console.log( 'Pristine:', this.formCategory.pristine );
      // console.log( 'Dirty:', this.formCategory.dirty );
      // console.log( 'Touched:', this.formCategory.touched );
      // console.log( 'Untouched:', this.formCategory.untouched );
      // console.groupEnd();
    }
    else {
      console.log('Formulario inválido');
    }


  }
}
