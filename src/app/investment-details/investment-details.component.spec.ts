import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentDetailsComponent } from './investment-details.component';

describe('InvestmentDetailsComponent', () => {
  let component: InvestmentDetailsComponent;
  let fixture: ComponentFixture<InvestmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
