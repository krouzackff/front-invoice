import { TestBed } from '@angular/core/testing';

import { ServicioLiquidacionPersonal } from './servicio-liquidacion-personal';

describe('ServicioLiquidacionPersonal', () => {
  let service: ServicioLiquidacionPersonal;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioLiquidacionPersonal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
