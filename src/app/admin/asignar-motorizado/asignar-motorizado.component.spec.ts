import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarMotorizadoComponent } from './asignar-motorizado.component';

describe('AsignarMotorizadoComponent', () => {
  let component: AsignarMotorizadoComponent;
  let fixture: ComponentFixture<AsignarMotorizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarMotorizadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarMotorizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
