import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LtDetailsComponent } from './lt-details.component';

describe('LtDetailsComponent', () => {
  let component: LtDetailsComponent;
  let fixture: ComponentFixture<LtDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LtDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LtDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
