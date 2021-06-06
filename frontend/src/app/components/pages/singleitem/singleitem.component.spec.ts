import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleitemComponent } from './singleitem.component';

describe('SingleitemComponent', () => {
  let component: SingleitemComponent;
  let fixture: ComponentFixture<SingleitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
