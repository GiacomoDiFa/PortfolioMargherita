import { Injectable, signal } from '@angular/core';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Utilizziamo i Signal di Angular per gestire lo stato in modo reattivo
  readonly currentUser = signal<User | null>(null);
  readonly isAuthenticated = signal<boolean>(false);

  constructor() {
    this.checkInitialAuthState();
  }

  /**
   * Controlla se l'utente è già loggato al caricamento dell'applicazione
   */
  private checkInitialAuthState(): void {
    const token = localStorage.getItem('access_token');
    // In un'app reale, qui decodificheresti il JWT o faresti una chiamata API per ottenere l'utente
    if (token) {
      // Mock utente per esempio
      this.currentUser.set({
        id: '1',
        name: 'Utente Demo',
        email: 'demo@example.com',
        role: 'user'
      });
      this.isAuthenticated.set(true);
    }
  }

  /**
   * Effettua il login dell'utente salvando il token
   */
  login(token: string, user: User): void {
    localStorage.setItem('access_token', token);
    this.currentUser.set(user);
    this.isAuthenticated.set(true);
  }

  /**
   * Effettua il logout pulendo lo stato e il token
   */
  logout(): void {
    localStorage.removeItem('access_token');
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }

  /**
   * Recupera il token salvato
   */
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
