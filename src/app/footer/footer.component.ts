import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, ContactComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  hoveringFB = false;
  hoveringInsta = false;
  hoveringYT = false;

}
