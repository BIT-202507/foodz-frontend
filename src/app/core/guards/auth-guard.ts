import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpAuth } from '../services/http-auth';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  // Paso 1: Inyectar la dependencia de HttpAuth para verificar el estado de autenticación
  const httpAuth = inject(HttpAuth);
  const router = inject(Router);

  // Paso 2: Verificar invocar el método checkAuthStatus() el retornara el acceso a la ruta protegida (true o false)
  return httpAuth.checkAuthStatus().pipe(
    tap( ( isAuthenticated ) => {
      // Paso 3: Redireccionar en caso de que No se tenga acceso a la ruta
      if( !isAuthenticated ) {
        router.navigateByUrl('/login'); // Redireccionar cuando no me deja acceder a la ruta
      }
    })
  );


};
