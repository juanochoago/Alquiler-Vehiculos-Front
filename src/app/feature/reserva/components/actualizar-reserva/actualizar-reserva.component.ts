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

  actualizaForm: FormGroup;
  fecha: string;
  reserva: Reserva;
  mensajeActualizar: string;

  constructor(protected reservaService: ReservaService) { }

  ngOnInit() {
    this.construirFormularioReserva();
    this.calcularFechaPermitida();
  }

  actualizar() {
    this.reservaService.actualizar(this.reserva).subscribe((): void => {
      this.mensajeActualizar = MENSAJE_RESERVA_ACTUALIZADA;
      const element: HTMLElement = document.getElementsByClassName('alerta-actualizar')[0] as HTMLElement;
      element.click();
      this.actualizaForm.reset();
    },
      error => {
        this.mensajeActualizar = error.error.mensaje;
        const element: HTMLElement = document.getElementsByClassName('alerta-actualizar')[0] as HTMLElement;
        element.click();
      });
  }

  consultar() {
    this.reservaService.consultar(this.actualizaForm.value).subscribe(result => {
      this.reserva = new Reserva(this.actualizaForm.get('id')?.value, result.idCliente, result.nombreCliente,
       result.tipoVehiculo, this.actualizaForm.get('fechaInicio')?.value, result.fechaFin, result.numeroDias,
       result.valor);
      this.actualizar();
    },
      error => {
        this.reserva = new Reserva(0, 0, error, 0, this.fecha, this.fecha, 0, 0);
      });
  }

  private construirFormularioReserva() {
    this.actualizaForm = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_ID),
      Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_ID), Validators.pattern(/^[0-9]\d*$/)]),
      fechaInicio: new FormControl('', [Validators.required]),
    });
  }

  public calcularFechaPermitida() {
    const dos = -2;
    let date = new Date();
    date = this.sumarDias(date, 1);
    const d = `0${date.getDate()}`.slice(dos);
    const m = `0${date.getMonth() + 1}`.slice(dos);
    const y = date.getFullYear();
    this.fecha = `${y}-${m}-${d}`;
  }

  private sumarDias(fecha, dias) {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }

}
