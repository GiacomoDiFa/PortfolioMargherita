import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header';
import { FooterComponent } from './footer/footer';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="layout-wrapper">
      <app-header></app-header>
      <!-- La view iniettata dal router occuperà tutto lo spazio disponibile -->
      <main class="main-content">
        <router-outlet />
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styles: [
    `
      .layout-wrapper {
        display: flex;
        flex-direction: column;
        min-height: 100vh; /* Forza il wrapper ad essere alto almeno quanto lo schermo */
        font-family:
          'Inter',
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          Helvetica,
          Arial,
          sans-serif;
      }

      .main-content {
        flex: 1; /* Fa espandere il contenitore principale spingendo il footer in fondo */
        display: flex;
        flex-direction: column;
        width: 100%;
      }
    `,
  ],
})
export class MainLayoutComponent {}
