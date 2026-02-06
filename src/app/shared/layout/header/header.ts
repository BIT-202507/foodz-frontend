import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { HttpAuth } from '../../../core/services/http-auth';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(
    private httpAuth: HttpAuth,
    private router: Router
  ) {}

  onLogout() {
    this.httpAuth.logout();   // Limpia el local storage
    // Redireccionar al home
    this.router.navigate(['/login']);
  }
}
