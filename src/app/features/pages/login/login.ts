import { Component } from '@angular/core';
import { Counter } from "../../components/counter/counter";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  formData!: FormGroup;

  constructor() {
    this.formData = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email] ),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
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
