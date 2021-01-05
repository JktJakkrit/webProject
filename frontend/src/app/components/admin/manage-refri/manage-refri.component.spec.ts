import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRefriComponent } from './manage-refri.component';

describe('ManageRefriComponent', () => {
  let component: ManageRefriComponent;
  let fixture: ComponentFixture<ManageRefriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageRefriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRefriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
