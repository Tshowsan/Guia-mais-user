import { TestBed } from '@angular/core/testing';

import { GuiaService } from './guia.service';

describe('GuiaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuiaService = TestBed.get(GuiaService);
    expect(service).toBeTruthy();
  });
});
