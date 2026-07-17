import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private activeRequests = 0;

  loading = signal(false);

  show(): void {
    this.activeRequests++;

    if (this.activeRequests === 1) {
      this.loading.set(true);
    }
  }

  hide(): void {
    if (this.activeRequests > 0) {
      this.activeRequests--;
    }

    if (this.activeRequests === 0) {
      this.loading.set(false);
    }
  }

  reset(): void {
    this.activeRequests = 0;
    this.loading.set(false);
  }
}
