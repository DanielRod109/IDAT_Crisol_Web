import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenSubComponent } from './gen-sub.component';

describe('GenSubComponent', () => {
  let component: GenSubComponent;
  let fixture: ComponentFixture<GenSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenSubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
