import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorizadoRegistrarEditarComponent } from './motorizado-registrar-editar.component';

describe('MotorizadoRegistrarEditarComponent', () => {
  let component: MotorizadoRegistrarEditarComponent;
  let fixture: ComponentFixture<MotorizadoRegistrarEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotorizadoRegistrarEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotorizadoRegistrarEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
