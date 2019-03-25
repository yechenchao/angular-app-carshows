import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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

    compClass = TestBed.get(CarShowsLookupComponent);
    carShowsService = TestBed.get(CarShowsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch car shows data', async () => {
    spyOn(carShowsService, 'getCarShowsData').and.returnValue(Promise.resolve([
      {
        make: 'Hondaka',
        cars: [
          {
            model: 'Elisa',
            shows: [ 'Cartopia', 'Melbourne Motor Show' ],
          }
        ],
      },
    ]));
    fixture.detectChanges();

    await compClass.getCarShows();

    expect(compClass.carShows).toEqual([
      {
        make: 'Hondaka',
        cars: [
          {
            model: 'Elisa',
            shows: [ 'Cartopia', 'Melbourne Motor Show' ],
          }
        ],
      },
    ]);
    expect(compClass.error).toEqual('');
  });

  it('should fail to fetch car shows data and show errors', async () => {
    spyOn(carShowsService, 'getCarShowsData').and.returnValue(Promise.reject('Failed to connect'));
    fixture.detectChanges();

    await compClass.getCarShows();

    expect(compClass.carShows).toEqual([]);
    expect(compClass.error).toEqual('Failed to connect');
  });

  it('should fetch empty data', async () => {
    spyOn(carShowsService, 'getCarShowsData').and.returnValue(Promise.resolve([]));
    fixture.detectChanges();

    await compClass.getCarShows();

    expect(compClass.carShows).toEqual([]);
    expect(compClass.error).toEqual('');
  });
});
