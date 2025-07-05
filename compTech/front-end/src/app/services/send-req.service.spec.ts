import { TestBed } from '@angular/core/testing';

import { SendReqService } from './send-req.service';

describe('SendReqService', () => {
  let service: SendReqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendReqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
