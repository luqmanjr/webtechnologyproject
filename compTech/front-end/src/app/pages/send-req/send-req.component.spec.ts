import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendReqComponent } from './send-req.component';

describe('SendReqComponent', () => {
  let component: SendReqComponent;
  let fixture: ComponentFixture<SendReqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendReqComponent]
    });
    fixture = TestBed.createComponent(SendReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
