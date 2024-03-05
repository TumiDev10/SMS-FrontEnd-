import { TestBed } from '@angular/core/testing';

import { ParentGuardianService } from './parent-guardian.service';

describe('ParentGuardianService', () => {
  let service: ParentGuardianService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParentGuardianService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
