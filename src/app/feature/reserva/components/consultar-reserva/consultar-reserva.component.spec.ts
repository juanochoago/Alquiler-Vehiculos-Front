import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { Reserva } from '@reserva/shared/model/reserva';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import { of, throwError } from 'rxjs';

import { ConsultarReservaComponent } from './consultar-reserva.component';

describe('ConsultarReservaComponent', () => {
  let component: ConsultarReservaComponent;
  let fixture: ComponentFixture<ConsultarReservaComponent>;
  let reservaService: ReservaService;
  const reserva: Reserva = new Reserva(1, 1026295589, 'Juan Angel', 1, '2022-02-28', '2022-03-2', 3, 300000);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultarReservaComponent],
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarReservaComponent);
    component = fixture.componentInstance;
    reservaService = TestBed.inject(ReservaService);
    spyOn(reservaService, 'consultar').and.returnValue(
      of(reserva)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Formulario invalido cuando es vacio', () => {
    expect(component.consultaForm.valid).toBeFalsy();
  });

  it('Consulta reserva por Id', () => {
    expect(component.consultaForm.valid).toBeFalsy();
    component.consultaForm.controls.id.setValue(2);
    expect(component.consultaForm.valid).toBeTruthy();
    component.consultar();
    expect(1).toBe(component.listaReservas.length);
  });


  it('Falla Consultar Reserva', () => {
    reservaService.consultar = jasmine.createSpy().and.returnValue(throwError({
      "nombreExcepcion": "EmptyResultDataAccessException",
      "mensaje": "Ocurrio un error favor contactar al administrador."
  }));
    component.consultar();
    expect(reservaService.consultar).toHaveBeenCalled();
  });
});