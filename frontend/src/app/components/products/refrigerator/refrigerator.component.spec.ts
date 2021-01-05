import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefrigeratorComponent } from './refrigerator.component';

describe('RefrigeratorComponent', () => {
  let component: RefrigeratorComponent;
  let fixture: ComponentFixture<RefrigeratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefrigeratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefrigeratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
