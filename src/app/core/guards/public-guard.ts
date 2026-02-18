import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpAuth } from '../services/http-auth';
import { map, tap } from 'rxjs';

export const publicGuard: CanActivateFn = (route, state) => {
  // Paso 1: Inyectar la dependencia de HttpAuth para verificar el estado de autenticación
  const httpAuth = inject(HttpAuth);
  const router = inject(Router);

  // Paso 2: Verificar invocar el método checkAuthStatus() el retornara el acceso a la ruta protegida (true o false)
  return httpAuth.checkAuthStatus().pipe(
    tap( ( isAuthenticated ) => {
      console.info( 'publicGuard', isAuthenticated );

      // Paso 3: Redireccionar en caso de que No se tenga acceso a la ruta
      if( isAuthenticated ) {
        router.navigateByUrl('/dashboard'); // Redireccionar cuando no me deja acceder a la ruta
      }
    }),
    map( isAuthenticated => {
      console.info( 'publicGuard', isAuthenticated );

      return ! isAuthenticated;
    } )
  );

};
