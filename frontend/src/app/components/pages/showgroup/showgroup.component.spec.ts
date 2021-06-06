import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowgroupComponent } from './showgroup.component';

describe('ShowgroupComponent', () => {
  let component: ShowgroupComponent;
  let fixture: ComponentFixture<ShowgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowgroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
