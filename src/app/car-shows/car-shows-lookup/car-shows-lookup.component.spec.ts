import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CarShowsService } from '../../shared/services/car-shows.service';
import { SharedModule } from '../../shared/shared.module';
import { CarShowsLookupComponent } from './car-shows-lookup.component';

describe('CarShowsLookupComponent', () => {
  let component: CarShowsLookupComponent;
  let fixture: ComponentFixture<CarShowsLookupComponent>;
  let compClass;
  let carShowsService: CarShowsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarShowsLookupComponent ],
      imports: [ SharedModule ],
      providers: [ CarShowsLookupComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarShowsLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    compClass = TestBed.get(CarShowsLookupComponent);
    carShowsService = TestBed.get(CarShowsService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch car shows data', async () => {
    spyOn(carShowsService, 'getCarShowsData').and.returnValue(of([]));

    await compClass.getCarShows();

    console.log(compClass.carShows)
  });
});
