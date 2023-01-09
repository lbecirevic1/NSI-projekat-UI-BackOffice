import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberPageComponent } from './subscriber-page.component';

describe('SubscriberPageComponent', () => {
  let component: SubscriberPageComponent;
  let fixture: ComponentFixture<SubscriberPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriberPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriberPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
