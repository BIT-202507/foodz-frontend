import { Component } from '@angular/core';
import { Counter } from "../../components/counter/counter";

@Component({
  selector: 'app-login',
  imports: [Counter],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

}
