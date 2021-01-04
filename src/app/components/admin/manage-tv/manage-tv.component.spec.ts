import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTvComponent } from './manage-tv.component';

describe('ManageTvComponent', () => {
  let component: ManageTvComponent;
  let fixture: ComponentFixture<ManageTvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
