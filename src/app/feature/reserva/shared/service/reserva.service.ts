import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Reserva } from '../model/reserva';


@Injectable()
export class ReservaService {

  constructor(protected http: HttpService) { }

  public consultar(reserva: Reserva) {
    return this.http.doGet<Reserva>(`${environment.endpoint}/vehiculo/${reserva.id}`, this.http.optsName('consultar reserva'));
  }

  public guardar(reserva: Reserva) {
    return this.http.doPost<Reserva, boolean>(`${environment.endpoint}/vehiculo`, reserva,
      this.http.optsName('crear reserva'));
  }

  public actualizar(reserva: Reserva) {
    return this.http.doPut<Reserva, boolean>(`${environment.endpoint}/vehiculo/${reserva.id}`, reserva,
      this.http.optsName('actualizar reserva'));
  }

}
