import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarLiquidacionesContador } from './consultar-liquidaciones-contador';

describe('ConsultarLiquidacionesContador', () => {
  let component: ConsultarLiquidacionesContador;
  let fixture: ComponentFixture<ConsultarLiquidacionesContador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarLiquidacionesContador],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultarLiquidacionesContador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
