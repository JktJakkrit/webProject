import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAirComponent } from './manage-air.component';

describe('ManageAirComponent', () => {
  let component: ManageAirComponent;
  let fixture: ComponentFixture<ManageAirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
