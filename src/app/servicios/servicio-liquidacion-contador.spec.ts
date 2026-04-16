import { TestBed } from '@angular/core/testing';

import { ServicioLiquidacionContador } from './servicio-liquidacion-contador';

describe('ServicioLiquidacionContador', () => {
  let service: ServicioLiquidacionContador;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioLiquidacionContador);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
