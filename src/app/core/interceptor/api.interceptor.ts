import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SpinnerService } from '../services/spinner.service';
import { finalize } from 'rxjs/operators';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const spinnerService = inject(SpinnerService);

  const token = authService.getToken();

  const isApiUrl = req.url.startsWith('/api') || req.url.includes('mio-dominio.com');

  let authReq = req;

  if (token && isApiUrl) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  spinnerService.show();

  return next(authReq).pipe(
    finalize(() => {
      spinnerService.hide();
    }),
  );
};
