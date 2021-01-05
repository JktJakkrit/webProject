import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWashComponent } from './manage-wash.component';

describe('ManageWashComponent', () => {
  let component: ManageWashComponent;
  let fixture: ComponentFixture<ManageWashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageWashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageWashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
