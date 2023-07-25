import { TestBed } from '@angular/core/testing';

import { GenSubService } from './gen-sub.service';

describe('GenSubService', () => {
  let service: GenSubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenSubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
