import { TestBed } from '@angular/core/testing';

import { ServicioLiquidacionTransportista } from './servicio-liquidacion-transportista';

describe('ServicioLiquidacionTransportista', () => {
  let service: ServicioLiquidacionTransportista;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioLiquidacionTransportista);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
