import { Component } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpAuth } from '../../../core/services/http-auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  formData!: FormGroup;

  constructor( private httpAuth: HttpAuth ) {
    this.formData = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email] ),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  onSubmit() {
    if(this.formData.valid) {
      console.log(this.formData.value);

      this.httpAuth.login(this.formData.value).subscribe({
        next: data => {
          console.log('Login successful', data);
          this.formData.reset();      // Reset the form upon successful login

          // TODO: Redirect to /dashboard or another page if needed
        },
        error: error => {
          console.error('There was an error during the login!', error);
        },
        complete: () => {
          console.log('Login request completed');
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
