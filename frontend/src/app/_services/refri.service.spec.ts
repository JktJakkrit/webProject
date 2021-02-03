import { TestBed } from '@angular/core/testing';

import { RefriService } from './refri.service';

describe('RefriService', () => {
  let service: RefriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
