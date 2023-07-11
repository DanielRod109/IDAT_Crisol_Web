import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoRegistrarEditarComponent } from './producto-registrar-editar.component';

describe('ProductoRegistrarEditarComponent', () => {
  let component: ProductoRegistrarEditarComponent;
  let fixture: ComponentFixture<ProductoRegistrarEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoRegistrarEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoRegistrarEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
