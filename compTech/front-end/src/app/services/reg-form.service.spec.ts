import { TestBed } from '@angular/core/testing';

import { RegFormService } from './reg-form.service';

describe('RegFormService', () => {
  let service: RegFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
