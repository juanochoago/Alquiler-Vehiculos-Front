import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { HttpResponse } from '@angular/common/http';
import { ReservaService } from './reserva.service';
import { Reserva } from '../model/reserva';

describe('ReservaService', () => {
  let httpMock: HttpTestingController;
  let service: ReservaService;
  const apiEndpointReserva = `${environment.endpoint}/vehiculo`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReservaService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ReservaService);
  });

  it('should be created', () => {
    const reservaService: ReservaService = TestBed.inject(ReservaService);
    expect(reservaService).toBeTruthy();
  });

  it('deberia consultar reserva', () => {
    const dummyReserva = new Reserva(1, 1026295589, 'Juan', 1, '2022-02-28', '2022-02-2', 3, 300000);
    service.consultar(dummyReserva).subscribe(reserva => {
      expect(reserva).toEqual(dummyReserva);
    });
    const req = httpMock.expectOne(`${apiEndpointReserva}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyReserva);
  });

  it('deberia crear una reserva', () => {
    const dummyReserva = new Reserva(1, 1026295589, 'Juan', 1, '2022-02-28', '2022-02-2', 3, 300000);
    service.guardar(dummyReserva).subscribe((respuesta) => {
      window.console.log('Log servicio guardar' + respuesta);
    });
    const req = httpMock.expectOne(apiEndpointReserva);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({ body: true }));
  });

  it('deberia actualizar una reserva', () => {
    const dummyReserva = new Reserva(1, 1026295589, 'Juan', 1, '2022-02-28', '2022-02-2', 3, 300000);
    service.actualizar(dummyReserva).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointReserva}/1`);
    expect(req.request.method).toBe('PUT');
    req.event(new HttpResponse<boolean>({ body: true }));
  });
});
