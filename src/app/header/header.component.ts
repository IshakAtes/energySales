import { NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {

  slideshowImages: string[] = [
    'assets/img/slide1.jpg',
    'assets/img/slide2.jpg',
    'assets/img/slide3.jpg',
    'assets/img/slide4.jpg',
    'assets/img/slide5.jpg'
  ];

  currentIndex: number = 0;
  intervalId: any;

  ngOnInit() {
    this.startSlideshow();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startSlideshow() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.slideshowImages.length;
    }, 5000); // 5000 ms = 5 Sekunden
  }

}
