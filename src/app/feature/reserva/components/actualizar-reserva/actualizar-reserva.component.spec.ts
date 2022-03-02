import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
//import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import { of } from 'rxjs';

import { ActualizarReservaComponent } from './actualizar-reserva.component';

describe('ActualizarReservaComponent', () => {
  let component: ActualizarReservaComponent;
  let fixture: ComponentFixture<ActualizarReservaComponent>;
  let reservaService: ReservaService;
  //const formBuilder: FormBuilder = new FormBuilder();
  const MENSAJE_RESERVA_ACTUALIZADA = "Reserva actualizada correctamente, Puede verificarla en el area de consultas";
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualizarReservaComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
      //  ReactiveFormsModule,
        //FormsModule
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
    expect(component.fecha).toBe('2022-03-03');
  });

  it('Actualizando reserva', () => {
    expect(component.actualizaForm.valid).toBeFalsy();
    component.actualizaForm.controls.id.setValue(1);
    component.actualizaForm.controls.fechaInicio.setValue('25-03-2022');
    expect(component.actualizaForm.valid).toBeTruthy();
    component.consultar();
    component.actualizar();
    expect(component.mensajeActualizar).toContain(MENSAJE_RESERVA_ACTUALIZADA);
  });

});