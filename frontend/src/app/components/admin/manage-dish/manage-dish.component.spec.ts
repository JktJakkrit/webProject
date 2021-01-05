import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDishComponent } from './manage-dish.component';

describe('ManageDishComponent', () => {
  let component: ManageDishComponent;
  let fixture: ComponentFixture<ManageDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
