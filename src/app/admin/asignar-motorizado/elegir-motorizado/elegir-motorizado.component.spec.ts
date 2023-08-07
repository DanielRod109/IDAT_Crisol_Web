import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElegirMotorizadoComponent } from './elegir-motorizado.component';

describe('ElegirMotorizadoComponent', () => {
  let component: ElegirMotorizadoComponent;
  let fixture: ComponentFixture<ElegirMotorizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElegirMotorizadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElegirMotorizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
