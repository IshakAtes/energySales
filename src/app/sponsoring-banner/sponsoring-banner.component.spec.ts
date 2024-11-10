import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsoringBannerComponent } from './sponsoring-banner.component';

describe('SponsoringBannerComponent', () => {
  let component: SponsoringBannerComponent;
  let fixture: ComponentFixture<SponsoringBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponsoringBannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SponsoringBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
