import { TestBed } from '@angular/core/testing';

import { ViewReqService } from './view-req.service';

describe('ViewReqService', () => {
  let service: ViewReqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewReqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
