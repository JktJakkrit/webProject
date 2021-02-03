import { TestBed } from '@angular/core/testing';

import { WashService } from './wash.service';

describe('WashService', () => {
  let service: WashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
