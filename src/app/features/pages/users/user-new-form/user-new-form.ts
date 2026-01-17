import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpUsers } from '../../../../core/services/http-users';

@Component({
  selector: 'app-user-new-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-new-form.html',
  styleUrl: './user-new-form.css',
})
export class UserNewForm {
  formData!: FormGroup;

  constructor(private funalito: HttpUsers) {
    // Define the form structure form equal html form fields
    this.formData = new FormGroup({
      name: new FormControl(''),
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      role: new FormControl('registered'),
      isActive: new FormControl(true),
    });
  }

  onSubmit() {
    console.log(this.formData.value);
    // Llamar al servicio para crear un usuario usando un objeto observable
    this.funalito.createUser(this.formData.value).subscribe({
      next: ( data ) => {
        console.log(data);
      },
      error: ( error ) => {
        console.error(error);
      },
      complete: () => {
        console.log('Limpie los campos del formulario.');
      }
    });
  }
}
