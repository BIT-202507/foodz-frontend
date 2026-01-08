import { Component } from '@angular/core';

@Component({
  selector: 'counter',
  template: `<h1>Counter</h1>
  <p>{{ counter }}</p>
  <button (click)="increment()">+</button>
  <button (click)="decrement()">-</button>
  `,
  styles: [`h1{ color: blue; }`]
})
export class Counter {
  // Atributos de clase
  counter = 0;

  // Métodos de clase
  increment() {
    this.counter++;
  }

  decrement() {
    this.counter--;
  }
}
