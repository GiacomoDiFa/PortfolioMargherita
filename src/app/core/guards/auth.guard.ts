import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard funzionale per proteggere le rotte che richiedono l'autenticazione.
 * Controlla anche i ruoli se specificati nei dati della rotta.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Se l'utente è autenticato
  if (authService.isAuthenticated()) {
    // Controllo dei ruoli (Role-Based Access Control - RBAC)
    // Es. { path: 'admin', canActivate: [authGuard], data: { role: 'admin' } }
    const expectedRole = route.data?.['role'];
    const userRole = authService.currentUser()?.role;

    if (expectedRole && userRole !== expectedRole) {
      // Se l'utente non ha il ruolo richiesto, lo reindirizziamo a una pagina di cortesia
      return router.createUrlTree(['/unauthorized']);
    }

    return true; // Accesso consentito
  }

  // Se l'utente non è autenticato, viene reindirizzato al login 
  // con l'url di ritorno per poterci tornare dopo il login
  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};
