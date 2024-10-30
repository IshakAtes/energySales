import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallToMeetingComponent } from './call-to-meeting.component';

describe('CallToMeetingComponent', () => {
  let component: CallToMeetingComponent;
  let fixture: ComponentFixture<CallToMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallToMeetingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CallToMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
