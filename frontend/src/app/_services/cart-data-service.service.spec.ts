import { TestBed } from '@angular/core/testing';

import { CartDataServiceService } from './cart-data-service.service';

describe('CartDataServiceService', () => {
  let service: CartDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
