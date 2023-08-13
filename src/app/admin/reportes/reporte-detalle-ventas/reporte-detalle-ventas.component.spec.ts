import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteDetalleVentasComponent } from './reporte-detalle-ventas.component';

describe('ReporteDetalleVentasComponent', () => {
  let component: ReporteDetalleVentasComponent;
  let fixture: ComponentFixture<ReporteDetalleVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteDetalleVentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteDetalleVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
