import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOtherComponent } from './manage-other.component';

describe('ManageOtherComponent', () => {
  let component: ManageOtherComponent;
  let fixture: ComponentFixture<ManageOtherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageOtherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
