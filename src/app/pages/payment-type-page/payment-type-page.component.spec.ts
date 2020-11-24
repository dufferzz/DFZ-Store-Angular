import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTypePageComponent } from './payment-type-page.component';

describe('PaymentTypePageComponent', () => {
  let component: PaymentTypePageComponent;
  let fixture: ComponentFixture<PaymentTypePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentTypePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentTypePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
