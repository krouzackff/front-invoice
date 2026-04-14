import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarLiquidacionesPersonales } from './consultar-liquidaciones-personales';

describe('ConsultarLiquidacionesPersonales', () => {
  let component: ConsultarLiquidacionesPersonales;
  let fixture: ComponentFixture<ConsultarLiquidacionesPersonales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarLiquidacionesPersonales],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultarLiquidacionesPersonales);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
