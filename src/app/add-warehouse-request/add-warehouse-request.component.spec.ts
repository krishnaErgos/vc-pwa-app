import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWarehouseRequestComponent } from './add-warehouse-request.component';

describe('AddWarehouseRequestComponent', () => {
  let component: AddWarehouseRequestComponent;
  let fixture: ComponentFixture<AddWarehouseRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWarehouseRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWarehouseRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
