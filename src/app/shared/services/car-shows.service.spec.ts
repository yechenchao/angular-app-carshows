import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { CarShowsService } from './car-shows.service';
import { CommonService } from './common.service';

describe('AccountService', () => {
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
      ]);

      expect(console.error).toHaveBeenCalledTimes(0);
      expect(httpClientMock.get).toHaveBeenCalledTimes(1);
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
      ]);

      expect(console.error).toHaveBeenCalledTimes(2);
      expect(httpClientMock.get).toHaveBeenCalledTimes(1);
    }));

  it('should add raw data to car show variable', inject([CarShowsService], async (service: CarShowsService) => {
    service.addToCarShowList('Moto Tourismo', [
      {
        make: 'Julio Mechannica',
        model: 'Mark 1',
      },
      {
        make: 'Julio Mechannica',
        model: 'Mark 4S',
      },
    ]);

    expect(service['rawCarShows']).toEqual([
      {
        make: 'Julio Mechannica',
        model: 'Mark 1',
        name: 'Moto Tourismo',
      },
      {
        make: 'Julio Mechannica',
        model: 'Mark 4S',
        name: 'Moto Tourismo',
      },
    ])
  }));

  it('should get formatted car shows', inject([CarShowsService], async (service: CarShowsService) => {
    service['rawCarShows'] = [
      {
        make: 'Julio Mechannica',
        model: 'Mark 4S',
        name: 'Moto Tourismo',
      },
      {
        make: 'Julio Mechannica',
        model: 'Mark 1',
        name: 'Melbourne Car Show',
      },
    ];

    const formattedCarShows = service.getFormattedCarShows();
    expect(formattedCarShows).toEqual([
      {
        make: 'Julio Mechannica',
        cars: [
          {
            model: 'Mark 1',
            shows: [ 'Melbourne Car Show' ],
          },
          {
            model: 'Mark 4S',
            shows: [ 'Moto Tourismo' ],
          }
        ]
      }
    ])
  }));

  it('should get formatted data of model shows ', inject([CarShowsService], async (service: CarShowsService) => {
    const modelShows = [
      {
        make: 'Julio Mechannica',
        model: 'Mark 4S',
        name: 'Moto Tourismo',
      },
      {
        make: 'Julio Mechannica',
        model: 'Mark 1',
        name: 'Melbourne Car Show',
      },
    ];

    const formattedModelShows = service.getModelShows(modelShows);
    expect(formattedModelShows).toEqual([
      {
        model: 'Mark 1',
        shows: [ 'Melbourne Car Show' ],
      },
      {
        model: 'Mark 4S',
        shows: [ 'Moto Tourismo' ],
      }
    ])
  }));

  it('should get shows ', inject([CarShowsService], async (service: CarShowsService) => {
    const rawModelShows = [
      {
        model: 'Mark 1',
        name: 'Moto Tourismo',
      },
      {
        model: 'Mark 1',
        name: 'Melbourne Car Show',
      },
    ];

    const formattedModelShows = service.getShows(rawModelShows);
    expect(formattedModelShows).toEqual([ 'Melbourne Car Show',  'Moto Tourismo' ]);
  }));

  it('should output empty data when get empty object from api', inject([CarShowsService], async (service: CarShowsService) => {
    httpClientMock.get.and.callFake(() => {
      return of({})
    });

    const carShows = await service.getCarShowsData();
    expect(carShows).toEqual([]);

    expect(console.error).toHaveBeenCalledTimes(0);
    expect(httpClientMock.get).toHaveBeenCalledTimes(1);
  }));

  it('should output empty data when get empty array from api', inject([CarShowsService], async (service: CarShowsService) => {
    httpClientMock.get.and.callFake(() => {
      return of([])
    });

    const carShows = await service.getCarShowsData();
    expect(carShows).toEqual([]);

    expect(console.error).toHaveBeenCalledTimes(0);
    expect(httpClientMock.get).toHaveBeenCalledTimes(1);
  }));

  it('should output empty data when get null value from api', inject([CarShowsService], async (service: CarShowsService) => {
    httpClientMock.get.and.callFake(() => {
      return of(null)
    });

    const carShows = await service.getCarShowsData();
    expect(carShows).toEqual([]);

    expect(console.error).toHaveBeenCalledTimes(0);
    expect(httpClientMock.get).toHaveBeenCalledTimes(1);
  }));

  it('should output empty data when get undefined value from api', inject([CarShowsService], async (service: CarShowsService) => {
    httpClientMock.get.and.callFake(() => {
      return of(undefined)
    });

    const carShows = await service.getCarShowsData();
    expect(carShows).toEqual([]);

    expect(console.error).toHaveBeenCalledTimes(0);
    expect(httpClientMock.get).toHaveBeenCalledTimes(1);
  }));

  it('should handle errors', inject([CarShowsService], async (service: CarShowsService) => {
    httpClientMock.get.and.callFake(() => {
      return throwError('Failed to connect to server.');
    });

    try {
      await service.getCarShowsData();
    } catch(err) {
      expect(err).toEqual('Failed connection to the service. Please try again.');
    }

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith('Failed to connect to server.');
    expect(httpClientMock.get).toHaveBeenCalledTimes(1);
  }));
});
