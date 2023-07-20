import { TestBed } from '@angular/core/testing';

import { ApiMotorizadoService } from './api-motorizado.service';

describe('ApiMotorizadoService', () => {
  let service: ApiMotorizadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMotorizadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
