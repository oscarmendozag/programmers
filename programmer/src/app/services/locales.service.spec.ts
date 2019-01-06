import { TestBed } from '@angular/core/testing';

import { LocalesService } from './locales.service';

describe('LocalesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalesService = TestBed.get(LocalesService);
    expect(service).toBeTruthy();
  });
});
