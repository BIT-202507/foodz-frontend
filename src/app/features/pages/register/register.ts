import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  formData!: FormGroup;

  constructor() {
    this.formData = new FormGroup({
      name: new FormControl('', [Validators.required] ),
      email: new FormControl('', [Validators.required, Validators.email] ),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  onSubmit() {
    if(this.formData.valid) {
      console.log(this.formData.value);
      this.formData.reset();
    } else {
      console.log("Form is invalid");
      this
    }
  }

  onReset() {
    this.formData.reset();
    this.formData.markAsPristine();
  }
}
