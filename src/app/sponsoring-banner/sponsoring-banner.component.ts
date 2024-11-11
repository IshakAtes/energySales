import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sponsoring-banner',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './sponsoring-banner.component.html',
  styleUrl: './sponsoring-banner.component.scss'
})
export class SponsoringBannerComponent {
  imageIndices = Array.from({ length: 50 }, (_, index) => index);
}
