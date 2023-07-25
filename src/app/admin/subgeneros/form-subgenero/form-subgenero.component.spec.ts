import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubgeneroComponent } from './form-subgenero.component';

describe('FormSubgeneroComponent', () => {
  let component: FormSubgeneroComponent;
  let fixture: ComponentFixture<FormSubgeneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSubgeneroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSubgeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
