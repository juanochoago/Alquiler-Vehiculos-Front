import { Component, OnInit } from '@angular/core';
import { Reserva } from '@reserva/shared/model/reserva';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReservaService } from '@reserva/shared/service/reserva.service';

const LONGITUD_MINIMA_PERMITIDA_ID = 1;
const LONGITUD_MAXIMA_PERMITIDA_ID = 10;

@Component({
  selector: 'app-consultar-reserva',
  templateUrl: './consultar-reserva.component.html',
  styleUrls: ['./consultar-reserva.component.css']
})
export class ConsultarReservaComponent implements OnInit {
  reserva: Reserva;
  listaReservas: Reserva[] = [];
  tablaVisible = false;
  mensaje: string;
  consultaForm: FormGroup;


  constructor(protected reservaServices: ReservaService) { }

  ngOnInit(): void {
    this.construirFormularioConsulta();
  }

  consultar() {
    this.reservaServices.consultar(this.consultaForm.value).subscribe(result => {
      this.tablaVisible = false;
      this.listaReservas = [];
      this.reserva = new Reserva(result['id'], result['idCliente'], result['nombreCliente'],
       result['tipoVehiculo'], result['fechaInicio'], result['fechaFin'], result['numeroDias'],
        result['valor']);
      this.listaReservas.push(this.reserva);
      this.tablaVisible = true;
    },
      error => {
        this.mensaje = error['error']['mensaje'];
        let element: HTMLElement = document.getElementsByClassName('alerta-consultar')[0] as HTMLElement;
        element.click();
        this.tablaVisible = false;
      });
  }

  private construirFormularioConsulta() {
    this.consultaForm = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_ID),
      Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_ID), Validators.pattern(/^[0-9]\d*$/)])
    });
  }

}
