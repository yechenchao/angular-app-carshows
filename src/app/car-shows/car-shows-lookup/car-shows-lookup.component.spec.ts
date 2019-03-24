import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarShowsLookupComponent } from './car-shows-lookup.component';

describe('CarShowsLookupComponent', () => {
  let component: CarShowsLookupComponent;
  let fixture: ComponentFixture<CarShowsLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarShowsLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarShowsLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
