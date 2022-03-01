import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import { of } from 'rxjs';

import { ActualizarReservaComponent } from './actualizar-reserva.component';

describe('ActualizarReservaComponent', () => {
  let component: ActualizarReservaComponent;
  let fixture: ComponentFixture<ActualizarReservaComponent>;
  let reservaService: ReservaService;
  //const MENSAJE_RESERVA_ACTUALIZADA = "Reserva actualizada correctamente, Puede verificarla en el area de consultas";
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualizarReservaComponent],
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
    expect(component.reservaForm.valid).toBeFalsy();
  });

  it('Crear fecha permitida', () => {
    component.calcularFechaPermitida();
    expect(component.fecha).toBe('2022-03-02');
  });
  /*it('Actualizando reserva', () => {
    expect(component.reservaForm.valid).toBeFalsy();
    component.reservaForm.controls.id.setValue(1);
    component.reservaForm.controls.fechaInicio.setValue('2022-03-25');
    expect(component.reservaForm.valid).toBeTruthy();
    component.consultar();
    component.actualizar(component.reservaForm.value);
    expect(component.mensaje).toContain(MENSAJE_RESERVA_ACTUALIZADA);
  });*/

});