import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * Interceptor funzionale per la gestione centralizzata degli errori HTTP.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Gestione centralizzata dell'errore 401 Unauthorized (Token scaduto o non valido)
      if (error.status === 401) {
        // Disconnetti l'utente
        authService.logout();
        
        // Reindirizza al login
        router.navigate(['/login'], { 
          // Potremmo salvare l'URL attuale per redirigere l'utente dopo il login
          queryParams: { sessionExpired: true } 
        });
      }
      
      // Gestione centralizzata dell'errore 403 Forbidden (Non autorizzato)
      if (error.status === 403) {
        router.navigate(['/unauthorized']);
      }

      // Qui potresti anche integrare un servizio per mostrare i toast/notifiche
      // toastService.showError(error.message);

      // Rilancia l'errore in modo che i singoli servizi/componenti possano gestirlo ulteriormente se necessario
      return throwError(() => error);
    })
  );
};
