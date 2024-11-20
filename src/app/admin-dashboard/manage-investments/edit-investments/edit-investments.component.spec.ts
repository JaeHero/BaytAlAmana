import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInvestmentsComponent } from './edit-investments.component';

describe('EditInvestmentsComponent', () => {
  let component: EditInvestmentsComponent;
  let fixture: ComponentFixture<EditInvestmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditInvestmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInvestmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
