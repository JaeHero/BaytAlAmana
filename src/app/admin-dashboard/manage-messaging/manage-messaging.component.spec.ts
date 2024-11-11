import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMessagingComponent } from './manage-messaging.component';

describe('ManageMessagingComponent', () => {
  let component: ManageMessagingComponent;
  let fixture: ComponentFixture<ManageMessagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageMessagingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMessagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
