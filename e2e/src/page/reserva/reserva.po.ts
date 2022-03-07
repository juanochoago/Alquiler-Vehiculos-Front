import { by, element } from 'protractor';

export class ReservaPage {
    private linkCrearReserva = element(by.id('linkCrearReserva'));
    private linkConsultarReserva = element(by.id('linkConsultarReserva'));
    private linkActualizarReserva = element(by.id('linkActualizarReserva'));
    private inputIdCliente = element(by.id('idCliente'));
    private inputNombreCliente = element(by.id('nombreCliente'));
    private inputTipoVehiculo = element(by.id('tipoVehiculo'));
    private inputFechaInicio = element(by.id('fechaInicio'));
    private inputNumeroDias = element(by.id('numeroDias'));
    private botonCrearReserva = element(by.id('botonCrear'));
    private mensajeModal = element(by.css('#alertaModal div.modal-body h6'));
    private inputIdReserva = element(by.id('id'));
    private botonConsultarReserva = element(by.id('botonConsultar'));
    private listaReservas = element.all(by.css('tbody tr'));
    private botonActualizarReserva = element(by.id('botonActualizar'));

    async clickBotonCrearReserva() {
        await this.linkCrearReserva.click();
    }

    async clickBotonConsultarReserva() {
        await this.linkConsultarReserva.click();
    }

    async clickBotonActualizarReserva() {
        await this.linkActualizarReserva.click();
    }

    async ingresarIdCliente(idCliente) {
        await this.inputIdCliente.sendKeys(idCliente);
    }

    async ingresarNombreCliente(nombreCliente) {
        await this.inputNombreCliente.sendKeys(nombreCliente);
    }

    async ingresarTipoVehiculo(tipoVehiculo) {
        await this.inputTipoVehiculo.sendKeys(tipoVehiculo);
    }

    async ingresarFechaInicio(fechaInicio) {
        await this.inputFechaInicio.sendKeys(fechaInicio);
    }

    async ingresarNumeroDias(numeroDias) {
        await this.inputNumeroDias.sendKeys(numeroDias);
    }

    async clickBotonCrearLaReserva() {
        await this.botonCrearReserva.submit();
    }

    async ingresarIdReserva(idReserva) {
        await this.inputIdReserva.sendKeys(idReserva);
    }

    async clickBotonConsultarLaReserva() {
        await this.botonConsultarReserva.submit();
    }

    async clickBotonActualizarLaReserva() {
        await this.botonActualizarReserva.submit();
    }

    async obtenerMensajeModal() {
        return this.mensajeModal.getText() as Promise<string>;
    }

    async contarReservas() {
        return this.listaReservas.count();
    }
}
