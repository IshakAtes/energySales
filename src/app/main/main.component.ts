import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { HeaderComponent } from '../header/header.component';
import { CallToMeetingComponent } from "../call-to-meeting/call-to-meeting.component";
import { OurServiceComponent } from "../our-service/our-service.component";
import { ServiceBannerComponent } from "../service-banner/service-banner.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NavComponent, HeaderComponent, CallToMeetingComponent, OurServiceComponent, ServiceBannerComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
