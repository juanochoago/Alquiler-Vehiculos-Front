import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Reserva } from '@reserva/shared/model/reserva';
import { ReservaService } from '@reserva/shared/service/reserva.service';

const LONGITUD_MINIMA_PERMITIDA_ID = 1;
const LONGITUD_MAXIMA_PERMITIDA_ID = 10;
const MENSAJE_RESERVA_ACTUALIZADA = 'Reserva actualizada correctamente, Puede verificarla en el area de consultas';

@Component({
  selector: 'app-actualizar-reserva',
  templateUrl: './actualizar-reserva.component.html',
  styleUrls: ['./actualizar-reserva.component.css']
})
export class ActualizarReservaComponent implements OnInit {

  reservaForm: FormGroup;
  fecha: string;
  reserva: Reserva;
  mensajeActualizar: string;

  constructor(protected reservaService: ReservaService) { }

  ngOnInit() {
    this.construirFormularioReserva();
    this.calcularFechaPermitida();
  }

  actualizar(reserva: Reserva) {
    this.reserva.id = reserva.id;
    this.reserva.fechaInicio = reserva.fechaInicio;
    this.reservaService.actualizar(this.reserva).subscribe((): void => {
      this.mensajeActualizar = MENSAJE_RESERVA_ACTUALIZADA;
      let element: HTMLElement = document.getElementsByClassName('alerta-actualizar')[0] as HTMLElement;
      element.click();
      this.reservaForm.reset();
    },
      error => {
        this.mensajeActualizar = error['error']['mensaje'];
        let element: HTMLElement = document.getElementsByClassName('alerta-actualizar')[0] as HTMLElement;
        element.click();
      });
  }

  consultar(reserva: Reserva) {
    this.reservaService.consultar(this.reservaForm.value).subscribe(result => {
      this.reserva = new Reserva(result['id'], result['idCliente'], result['nombreCliente'], result['tipoVehiculo'], result['fechaInicio'], result['fechaFin'], result['numeroDias'], result['valor']);
      this.actualizar(reserva);
    },
      error => {
        window.console.error(error);
        this.reserva = new Reserva(0, 0, '', 0, this.fecha, this.fecha, 0, 0);
      });
  }

  private construirFormularioReserva() {
    this.reservaForm = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_ID),
      Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_ID), Validators.pattern(/^[0-9]\d*$/)]),
      fechaInicio: new FormControl('', [Validators.required]),
    });
  }

  public calcularFechaPermitida() {
    let dos = -2;
    let date = new Date();
    date = this.sumarDias(date, 1);
    let d = `0${date.getDate()}`.slice(dos);
    let m = `0${date.getMonth() + 1}`.slice(dos);
    let y = date.getFullYear();
    this.fecha = `${y}-${m}-${d}`;
  }

  private sumarDias(fecha, dias) {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }

}
