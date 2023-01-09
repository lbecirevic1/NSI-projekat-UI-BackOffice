import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionsSelectComponent } from './regions-select.component';

describe('RegionsSelectComponent', () => {
  let component: RegionsSelectComponent;
  let fixture: ComponentFixture<RegionsSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionsSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
