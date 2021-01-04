import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WashingMachineComponent } from './washing-machine.component';

describe('WashingMachineComponent', () => {
  let component: WashingMachineComponent;
  let fixture: ComponentFixture<WashingMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WashingMachineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WashingMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
