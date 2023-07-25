import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosEntregaComponent } from './datos-entrega.component';

describe('DatosEntregaComponent', () => {
  let component: DatosEntregaComponent;
  let fixture: ComponentFixture<DatosEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosEntregaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
