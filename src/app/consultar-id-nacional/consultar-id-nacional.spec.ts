import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarIdNacional } from './consultar-id-nacional';

describe('ConsultarIdNacional', () => {
  let component: ConsultarIdNacional;
  let fixture: ComponentFixture<ConsultarIdNacional>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarIdNacional],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultarIdNacional);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
