import { Component, inject, OnInit } from '@angular/core';
import { apiService } from '../../core/services/api.service';

@Component({
  selector: 'app-pricing',
  imports: [],
  templateUrl: './pricing.html',
  styleUrl: './pricing.scss',
})
export class Pricing implements OnInit {
  private service = inject(apiService);
  ngOnInit(): void {
    this.service.getItems().subscribe((res) => {
      console.log(res);
    });
  }
}
