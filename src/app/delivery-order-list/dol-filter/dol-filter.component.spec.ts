import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DOLFilterComponent } from './dol-filter.component';

describe('DOLFilterComponent', () => {
  let component: DOLFilterComponent;
  let fixture: ComponentFixture<DOLFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DOLFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DOLFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
