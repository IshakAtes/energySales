import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { HeaderComponent } from '../header/header.component';
import { CallToMeetingComponent } from "../call-to-meeting/call-to-meeting.component";
import { OurServiceComponent } from "../our-service/our-service.component";
import { ServiceBannerComponent } from "../service-banner/service-banner.component";
import { ContactComponent } from '../contact/contact.component';
import { FooterComponent } from '../footer/footer.component';
import { RoadmapComponent } from '../roadmap/roadmap.component';
import { SponsoringBannerComponent } from '../sponsoring-banner/sponsoring-banner.component';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NavComponent, HeaderComponent, CallToMeetingComponent, RoadmapComponent, OurServiceComponent, SponsoringBannerComponent, ServiceBannerComponent, ContactComponent, FooterComponent, ContactFormComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
