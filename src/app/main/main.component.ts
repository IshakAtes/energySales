import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NavComponent, HeaderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
