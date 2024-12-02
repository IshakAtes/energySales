import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-call-to-meeting',
  standalone: true,
  imports: [NgIf],
  templateUrl: './call-to-meeting.component.html',
  styleUrl: './call-to-meeting.component.scss'
})
export class CallToMeetingComponent {
  toggleDialog: boolean = false;

  constructor() {}

  openDialog() {
    this.toggleDialog = !this.toggleDialog;
  }

  closeDialog() {
    this.toggleDialog = !this.toggleDialog;
  }
}
