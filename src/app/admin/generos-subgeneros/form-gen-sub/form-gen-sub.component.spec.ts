import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGenSubComponent } from './form-gen-sub.component';

describe('FormGenSubComponent', () => {
  let component: FormGenSubComponent;
  let fixture: ComponentFixture<FormGenSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGenSubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGenSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
