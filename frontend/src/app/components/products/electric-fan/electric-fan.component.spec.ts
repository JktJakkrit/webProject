import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricFanComponent } from './electric-fan.component';

describe('ElectricFanComponent', () => {
  let component: ElectricFanComponent;
  let fixture: ComponentFixture<ElectricFanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectricFanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricFanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
