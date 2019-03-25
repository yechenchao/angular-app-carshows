import { inject, TestBed } from '@angular/core/testing';
import { CommonService } from './common.service';

describe('CommonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommonService,
      ],
    });

    spyOn(console, 'error');
  });

  it('should validate array', inject([CommonService], (service: CommonService) => {
    const stringArray = [ 'car', 'show', 'model' ];
    expect(service.isValidArray(stringArray)).toBeTruthy();

    const objectArray = [
      {
        model: 'Mark 4',
      }
    ];
    expect(service.isValidArray(objectArray)).toBeTruthy();

    const emptyArray = [];
    expect(service.isValidArray(emptyArray)).toBeFalsy();

    const object = {};
    expect(service.isValidArray(object)).toBeFalsy();
  }));

  it('should catch and throw error', inject([CommonService], (service: CommonService) => {
    service.handleError('network error');

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith('network error');
  }));
});
