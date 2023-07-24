import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsCarritoComponent } from './items-carrito.component';

describe('ItemsCarritoComponent', () => {
  let component: ItemsCarritoComponent;
  let fixture: ComponentFixture<ItemsCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsCarritoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
