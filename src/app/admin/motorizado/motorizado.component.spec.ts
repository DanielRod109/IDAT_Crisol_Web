import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorizadoComponent } from './motorizado.component';

describe('MotorizadoComponent', () => {
  let component: MotorizadoComponent;
  let fixture: ComponentFixture<MotorizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotorizadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotorizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
