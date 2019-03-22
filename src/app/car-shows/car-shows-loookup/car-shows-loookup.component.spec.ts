import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarShowsLoookupComponent } from './car-shows-loookup.component';

describe('CarShowsLoookupComponent', () => {
  let component: CarShowsLoookupComponent;
  let fixture: ComponentFixture<CarShowsLoookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarShowsLoookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarShowsLoookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
