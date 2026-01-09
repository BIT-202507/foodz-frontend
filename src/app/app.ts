import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./shared/layout/footer/footer";
import { Header } from "./shared/layout/header/header";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [RouterOutlet, Footer, Header]
})
export class App {
  protected readonly title = signal('frontend');
}
