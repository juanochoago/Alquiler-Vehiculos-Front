import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReservaService } from '@reserva/shared/service/reserva.service';

const LONGITUD_MINIMA_PERMITIDA_DOCUMENTO = 1;
const LONGITUD_MAXIMA_PERMITIDA_DOCUMENTO = 15;
const LONGITUD_MINIMA_PERMITIDA_NOMBRE = 3;
const LONGITUD_MAXIMA_PERMITIDA_NOMBRE = 40;
const LONGITUD_MINIMA_PERMITIDA_DIAS = 1;
const LONGITUD_MAXIMA_PERMITIDA_DIAS = 2;
const MENSAJE_RESERVA_CREADA = 'Reserva creada correctamente, Numero de reserva =';

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.css']
})
export class CrearReservaComponent implements OnInit {

  reservaForm: FormGroup;
  fechaPermitida: string;
  mensaje: string;

  constructor(protected reservaService: ReservaService) { }

  ngOnInit() {
    this.construirFormularioReserva();
    this.calcularFechaPermitida();
  }

  crear() {
    this.reservaService.guardar(this.reservaForm.value).subscribe((result) => {
      this.mensaje = MENSAJE_RESERVA_CREADA + result['valor'];
      let element: HTMLElement = document.getElementsByClassName('alerta-crear')[0] as HTMLElement;
      element.click();
      this.reservaForm.reset();
    });
  }

  private construirFormularioReserva() {
    this.reservaForm = new FormGroup({
      idCliente: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_DOCUMENTO),
      Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_DOCUMENTO), Validators.pattern(/^[0-9]\d*$/)]),
      nombreCliente: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_NOMBRE),
      Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_NOMBRE)]),
      tipoVehiculo: new FormControl('', [Validators.required]),
      fechaInicio: new FormControl('', [Validators.required]),
      numeroDias: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_DIAS),
      Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_DIAS), Validators.pattern(/^[0-9]\d*$/)]),
    });
  }

  public calcularFechaPermitida() {
    let menosDos = -2;
    let date = new Date();
    date = this.sumarDias(date, 1);
    let day = `0${date.getDate()}`.slice(menosDos);
    let month = `0${date.getMonth() + 1}`.slice(menosDos);
    let year = date.getFullYear();
    this.fechaPermitida = `${year}-${month}-${day}`;
  }

  private sumarDias(fecha, dias) {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }

}
