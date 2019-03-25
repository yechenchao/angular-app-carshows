import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CarShowsService } from './car-shows.service';
import { CommonService } from './common.service';

fdescribe('AccountService', () => {
  const httpClientMock = {
    get: jasmine.createSpy('get'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        CarShowsService,
        CommonService,
        {
          provide: HttpClient,
          useValue: httpClientMock
        }
      ],
    });

    spyOn(console, 'error');
    httpClientMock.get.calls.reset();
  });

  it('should be truthy', inject([CarShowsService], (service: CarShowsService) => {
    expect(service).toBeTruthy();
  }));

  it('should fetch corruption-free data and output re-formatted data grouped by make alphabetically',
    inject([CarShowsService], async (service: CarShowsService) => {
      httpClientMock.get.and.callFake(() => {
        return of([
          {
            name: 'Melbourne Motor Show',
            cars: [
              {
                make: 'Julio Mechannica',
                model: 'Mark 4S',
              },
              {
                make: 'Hondaka',
                model: 'Elisa',
              },
            ]
          },
          {
            name: 'Cartopia',
            cars: [
              {
                make: 'Moto Tourismo',
                model: 'Cyclissimo',
              },
              {
                make: 'Julio Mechannica',
                model: 'Mark 1',
              },
              {
                make: 'Hondaka',
                model: 'Elisa',
              },
            ]
          },
        ])
      });

      const carShows = await service.getCarShowsData();
      expect(carShows).toEqual([
        {
          make: 'Hondaka',
          cars: [
            {
              model: 'Elisa',
              shows: [ 'Cartopia', 'Melbourne Motor Show' ],
            }
          ],
        },
        {
          make: 'Julio Mechannica',
          cars: [
            {
              model: 'Mark 1',
              shows: [ 'Cartopia' ]
            },
            {
              model: 'Mark 4S',
              shows: [ 'Melbourne Motor Show' ]
            },
          ],
        },
        {
          make: 'Moto Tourismo',
          cars: [
            {
              model: 'Cyclissimo',
              shows: [ 'Cartopia' ]
            },
          ],
        },
      ])
  }));

  it('should remove corrupted data and output re-formatted data grouped by make alphabetically',
    inject([CarShowsService], async (service: CarShowsService) => {
      httpClientMock.get.and.callFake(() => {
        return of([
          {
            name: 'Melbourne Motor Show',
            cars: [
              {
                make: 'Julio Mechannica',
                model: 'Mark 4S',
              },
              {
                make: 'Hondaka',
                model: 'Elisa',
              },
              {
                make: 'Hondaka',
                model: 'Elisa',
              },
              {
                make: 'Hondaka',
                model: '',
              },
            ]
          },
          {
            name: 'Cartopia',
            cars: [
              {
                make: 'Moto Tourismo',
                model: 'Cyclissimo',
              },
              {
                make: 'Julio Mechannica',
                model: 'Mark 1',
              },
              {
                make: 'Hondaka',
                model: 'Elisa',
              },
              {
                make: '',
                model: 'Elisa',
              },
            ]
          },
          {
            name: 'Cartopia',
          },
          {
            cars: [
              {
                make: 'Moto Tourismo',
                model: 'Cyclissimo',
              },
            ]
          },
        ])
      });

      const carShows = await service.getCarShowsData();
      expect(carShows).toEqual([
        {
          make: 'Hondaka',
          cars: [
            {
              model: 'Elisa',
              shows: [ 'Cartopia', 'Melbourne Motor Show' ],
            }
          ],
        },
        {
          make: 'Julio Mechannica',
          cars: [
            {
              model: 'Mark 1',
              shows: [ 'Cartopia' ]
            },
            {
              model: 'Mark 4S',
              shows: [ 'Melbourne Motor Show' ]
            },
          ],
        },
        {
          make: 'Moto Tourismo',
          cars: [
            {
              model: 'Cyclissimo',
              shows: [ 'Cartopia' ]
            },
          ],
        },
      ])
    }));

  it('should output empty data when get empty object from api', inject([CarShowsService], async (service: CarShowsService) => {
    httpClientMock.get.and.callFake(() => {
      return of({})
    });

    const carShows = await service.getCarShowsData();
    expect(carShows).toEqual([]);
  }));

  it('should output empty data when get empty array from api', inject([CarShowsService], async (service: CarShowsService) => {
    httpClientMock.get.and.callFake(() => {
      return of([])
    });

    const carShows = await service.getCarShowsData();
    expect(carShows).toEqual([]);
  }));

  it('should output empty data when get null value from api', inject([CarShowsService], async (service: CarShowsService) => {
    httpClientMock.get.and.callFake(() => {
      return of(null)
    });

    const carShows = await service.getCarShowsData();
    expect(carShows).toEqual([]);
  }));

  it('should output empty data when get undefined value from api', inject([CarShowsService], async (service: CarShowsService) => {
    httpClientMock.get.and.callFake(() => {
      return of(undefined)
    });

    const carShows = await service.getCarShowsData();
    expect(carShows).toEqual([]);
  }));
});
