import { EnvironmentProviders, Provider } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiInterceptor } from './interceptor/api.interceptor';
import { errorInterceptor } from './interceptor/error.interceptor';

/**
 * Fornisce le dipendenze "core" dell'applicazione.
 * Questa funzione centralizza la configurazione (es. degli interceptor)
 * e va importata nel file app.config.ts
 * 
 * Esempio in app.config.ts:
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideRouter(routes),
 *     provideCore(), // Inseriamo qui le nostre configurazioni core
 *   ]
 * };
 */
export function provideCore(): Array<Provider | EnvironmentProviders> {
  return [
    // Configura HttpClient con gli interceptor funzionali
    provideHttpClient(
      withInterceptors([
        apiInterceptor,
        errorInterceptor
      ])
    ),
    // Qui puoi aggiungere altri provider "globali" (singleton)
    // come ad esempio configurazioni per il multilanguage, 
    // l'inizializzazione dell'app (APP_INITIALIZER), ecc.
  ];
}
