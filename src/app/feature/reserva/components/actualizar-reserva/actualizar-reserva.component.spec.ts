import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { Reserva } from '@reserva/shared/model/reserva';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import { of, throwError } from 'rxjs';

import { ActualizarReservaComponent } from './actualizar-reserva.component';

describe('ActualizarReservaComponent', () => {
  let component: ActualizarReservaComponent;
  let fixture: ComponentFixture<ActualizarReservaComponent>;
  let reservaService: ReservaService;
  const reserva: Reserva = new Reserva(1, 1026295589, 'Juan Angel', 1, '2022-02-28', '2022-03-2', 3, 300000);
  const MENSAJE_RESERVA_ACTUALIZADA = 'Reserva actualizada correctamente, Puede verificarla en el area de consultas';
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualizarReservaComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [ReservaService, HttpService],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarReservaComponent);
    component = fixture.componentInstance;
    reservaService = TestBed.inject(ReservaService);
    spyOn(reservaService, 'actualizar').and.returnValue(
      of(true)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Formulario invalido cuando es vacio', () => {
    expect(component.actualizaForm.valid).toBeFalsy();
  });

  it('Crear fecha permitida', () => {
    component.calcularFechaPermitida();
    expect(component.fecha).toBe('2022-03-08');
  });

  it('Actualizando reserva', () => {
    expect(component.actualizaForm.valid).toBeFalsy();
    component.actualizaForm.controls.id.setValue(1);
    component.actualizaForm.controls.fechaInicio.setValue('25-03-2022');
    expect(component.actualizaForm.valid).toBeTruthy();
    spyOn(reservaService, 'consultar').and.callFake(() => {
      return of(reserva);
    });
    component.consultar();
    expect(reservaService.consultar).toHaveBeenCalled();
    component.actualizar();
    expect(component.mensajeActualizar).toContain(MENSAJE_RESERVA_ACTUALIZADA);
  });

  it('Falla Actualizar Reserva', () => {
    reservaService.consultar = jasmine.createSpy().and.returnValue(throwError({}));
    component.consultar();
    reservaService.actualizar = jasmine.createSpy().and.returnValue(throwError({}));
    component.actualizar();
    expect(reservaService.actualizar).toHaveBeenCalled();
  });
});
