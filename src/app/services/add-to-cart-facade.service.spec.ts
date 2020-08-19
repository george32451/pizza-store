import { TestBed } from '@angular/core/testing';

import { AddToCartFacadeService } from './add-to-cart-facade.service';

describe('AddToCartFacadeService', () => {
  let service: AddToCartFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddToCartFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
