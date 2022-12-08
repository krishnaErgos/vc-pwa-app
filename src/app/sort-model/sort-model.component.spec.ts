import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortModelComponent } from './sort-model.component';

describe('SortModelComponent', () => {
  let component: SortModelComponent;
  let fixture: ComponentFixture<SortModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
