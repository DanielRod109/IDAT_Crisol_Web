import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubgeneroComponent } from './subgenero.component';

describe('SubgeneroComponent', () => {
  let component: SubgeneroComponent;
  let fixture: ComponentFixture<SubgeneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubgeneroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubgeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
