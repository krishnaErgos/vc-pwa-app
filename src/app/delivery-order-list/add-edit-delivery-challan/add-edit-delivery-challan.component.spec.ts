import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDeliveryChallanComponent } from './add-edit-delivery-challan.component';

describe('AddEditDeliveryChallanComponent', () => {
  let component: AddEditDeliveryChallanComponent;
  let fixture: ComponentFixture<AddEditDeliveryChallanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDeliveryChallanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDeliveryChallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
