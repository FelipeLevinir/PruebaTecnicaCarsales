import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ha ocurrido un error inesperado';

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        switch (error.status) {
          case 0:
            errorMessage = 'No se puede conectar al servidor. Verifica tu conexión.';
            break;
          case 400:
            errorMessage = 'Solicitud inválida. Revisa los datos enviados.';
            break;
          case 401:
            errorMessage = 'No autorizado. Inicia sesión nuevamente.';
            break;
          case 403:
            errorMessage = 'Acceso prohibido. No tienes permisos.';
            break;
          case 404:
            errorMessage = 'Recurso no encontrado.';
            break;
          case 500:
            errorMessage = 'Error interno del servidor.';
            break;
          case 503:
            errorMessage = 'Servicio no disponible. Intenta más tarde.';
            break;
          default:
            errorMessage = `Error ${error.status}: ${error.message}`;
        }
      }

      errorService.showError(errorMessage);
      return throwError(() => error);
    })
  );
};