import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDcComponent } from './add-dc.component';

describe('AddDcComponent', () => {
  let component: AddDcComponent;
  let fixture: ComponentFixture<AddDcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
