import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirConditioningComponent } from './air-conditioning.component';

describe('AirConditioningComponent', () => {
  let component: AirConditioningComponent;
  let fixture: ComponentFixture<AirConditioningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirConditioningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirConditioningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
