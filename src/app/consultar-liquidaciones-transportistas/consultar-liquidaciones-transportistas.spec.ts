import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarLiquidacionesTransportistas } from './consultar-liquidaciones-transportistas';

describe('ConsultarLiquidacionesTransportistas', () => {
  let component: ConsultarLiquidacionesTransportistas;
  let fixture: ComponentFixture<ConsultarLiquidacionesTransportistas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarLiquidacionesTransportistas],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultarLiquidacionesTransportistas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
