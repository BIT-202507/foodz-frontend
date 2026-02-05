import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpAuth } from '../../../core/services/http-auth';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  formData!: FormGroup;

  constructor( private httpAuth: HttpAuth ) {
    this.formData = new FormGroup({
      name: new FormControl('', [Validators.required] ),
      username: new FormControl('', [Validators.required] ),
      email: new FormControl('', [Validators.required, Validators.email] ),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  onSubmit() {
    if(this.formData.valid) {
      console.log(this.formData.value);

      this.httpAuth.register( this.formData.value ).subscribe({
        next: (data) => {
          console.log("Registration successful", data);
        },
        error: (error) => {
          console.error("Registration failed", error);
        },
        complete: () => {
          this.formData.reset();
        }
      });

    } else {
      console.log("Form is invalid");
      this.formData.markAllAsTouched();
    }
  }

  onReset() {
    this.formData.reset();
    this.formData.markAsPristine();
  }
}
