import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFanComponent } from './manage-fan.component';

describe('ManageFanComponent', () => {
  let component: ManageFanComponent;
  let fixture: ComponentFixture<ManageFanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageFanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
