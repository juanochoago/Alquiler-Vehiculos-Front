import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservaService } from '@reserva/shared/service/reserva.service';

import { CrearReservaComponent } from './crear-reserva.component';
import { HttpService } from '@core/services/http.service';
import { of, throwError, } from 'rxjs';
import { ResponseReserva } from '@reserva/shared/model/response-reserva';

const MENSAJE_RESERVA_CREADA = 'Reserva creada correctamente, Numero de reserva =';

describe('CrearReservaComponent', () => {
  let component: CrearReservaComponent;
  let fixture: ComponentFixture<CrearReservaComponent>;
  let reservaService: ReservaService;
  const dummyResponseReserva = new ResponseReserva(1);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CrearReservaComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [ReservaService, HttpService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearReservaComponent);
    component = fixture.componentInstance;
    reservaService = TestBed.inject(ReservaService);
    spyOn(reservaService, 'guardar').and.returnValue(
      of(dummyResponseReserva)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.reservaForm.valid).toBeFalsy();
  });

  it('Crear fecha permitida', () => {
    component.calcularFechaPermitida();
    expect(component.fechaPermitida).toBe('2022-03-08');
  });

  it('Crear Reserva', () => {
    expect(component.reservaForm.valid).toBeFalsy();
    component.reservaForm.controls.idCliente.setValue(1026295589);
    component.reservaForm.controls.nombreCliente.setValue('Juan');
    component.reservaForm.controls.tipoVehiculo.setValue(1);
    component.reservaForm.controls.fechaInicio.setValue('2022-02-28');
    component.reservaForm.controls.numeroDias.setValue(3);

    expect(component.reservaForm.valid).toBeTruthy();

    component.crear();
    expect(component.mensajeCrear).toContain(MENSAJE_RESERVA_CREADA);

  });

  it('Falla Crear Reserva', () => {
    reservaService.guardar = jasmine.createSpy().and.returnValue(throwError({}));
    component.crear();
    expect(reservaService.guardar).toHaveBeenCalled();
  });
});
