import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarFormaDePagoCliente } from './registrar-forma-de-pago-cliente';

describe('RegistrarFormaDePagoCliente', () => {
  let component: RegistrarFormaDePagoCliente;
  let fixture: ComponentFixture<RegistrarFormaDePagoCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarFormaDePagoCliente],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarFormaDePagoCliente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
