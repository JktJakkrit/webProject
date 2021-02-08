import { TestBed } from '@angular/core/testing';

import { AmountsService } from './amounts.service';

describe('AmountsService', () => {
  let service: AmountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
