import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInvestmentsComponent } from './manage-investments.component';

describe('ManageInvestmentsComponent', () => {
  let component: ManageInvestmentsComponent;
  let fixture: ComponentFixture<ManageInvestmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageInvestmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageInvestmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
