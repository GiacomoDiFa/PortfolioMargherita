import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class apiService {
  private http = inject(HttpClient);
  private baseUrl = '/api/movies';

  public getItems() {
    return this.http.get(`${this.baseUrl}`);
  }
}
