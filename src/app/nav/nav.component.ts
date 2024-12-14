import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, FormsModule, NgStyle],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  menuOpen = false;
  screenWidth = window.innerWidth <= 400;

  closeMenu() {
    setTimeout(() => {
      this.menuOpen = false
    }, 125)
  }
}
