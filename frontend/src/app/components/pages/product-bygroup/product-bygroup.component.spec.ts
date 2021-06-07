import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBygroupComponent } from './product-bygroup.component';

describe('ProductBygroupComponent', () => {
  let component: ProductBygroupComponent;
  let fixture: ComponentFixture<ProductBygroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductBygroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBygroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
