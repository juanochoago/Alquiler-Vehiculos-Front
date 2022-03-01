export class Reserva {
    id: number;
    idCliente: number;
    nombreCliente: string;
    tipoVehiculo: number;
    fechaInicio: string;
    fechaFin: string;
    numeroDias: number;
    valor: number;

    constructor(id: number, idCliente: number, nombreCliente: string, tipoVehiculo: number, fechaInicio: string, fechaFin: string, numeroDias: number, valor: number) {
        this.id = id;
        this.idCliente = idCliente;
        this.nombreCliente = nombreCliente;
        this.tipoVehiculo = tipoVehiculo;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.numeroDias = numeroDias;
        this.valor = valor;
    }
}
