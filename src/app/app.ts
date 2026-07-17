import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerService } from './core/services/spinner.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProgressSpinnerModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  public spinnerService = inject(SpinnerService);
}
