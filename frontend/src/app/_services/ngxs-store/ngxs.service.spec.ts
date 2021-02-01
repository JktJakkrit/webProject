import { TestBed } from '@angular/core/testing';

import { NgxsService } from './ngxs.service';

describe('NgxsService', () => {
  let service: NgxsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
