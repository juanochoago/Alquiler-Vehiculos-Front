import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { ReservaPage } from '../page/reserva/reserva.po';

const MENSAJE_RESERVA_CREADA = "Reserva creada correctamente, Numero de reserva =";
const MENSAJE_RESERVA_ACTUALIZADA = "Reserva actualizada correctamente, Puede verificarla en el area de consultas";

describe('workspace-project Producto', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let reserva: ReservaPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        reserva = new ReservaPage();
    });

    it('Deberia crear reserva', () => {
        const ID_CLIENTE = '1026295581';
        const NOMBRE_CLIENTE = 'Juan';
        const TIPO_VEHICULO = "Automovil";
        const FECHA_INICIO = '01-03-2022';
        const NUMERO_DIAS = '2';

        page.navigateTo();
        navBar.clickBotonReservas();
        reserva.clickBotonCrearReserva();
        reserva.ingresarIdCliente(ID_CLIENTE);
        reserva.ingresarNombreCliente(NOMBRE_CLIENTE);
        reserva.ingresarTipoVehiculo(TIPO_VEHICULO);
        reserva.ingresarFechaInicio(FECHA_INICIO);
        reserva.ingresarNumeroDias(NUMERO_DIAS);
        reserva.clickBotonCrearLaReserva();
        expect(reserva.obtenerMensajeCrearReserva()).toContain(MENSAJE_RESERVA_CREADA);
    });

    it('Deberia consultar reserva', () => {
        const ID_RESERVA = 1;
        page.navigateTo();
        navBar.clickBotonReservas();
        reserva.clickBotonConsultarReserva();
        reserva.ingresarIdReserva(ID_RESERVA);
        reserva.clickBotonConsultarLaReserva();
        expect(1).toBe(reserva.contarReservas());
    });

    it('Deberia actualizar reserva', () => {
        const ID_RESERVA = 1;
        const FECHA_INICIO = '01-03-2022';
        page.navigateTo();
        navBar.clickBotonReservas();
        reserva.clickBotonActualizarReserva();
        reserva.ingresarIdReserva(ID_RESERVA);
        reserva.ingresarFechaInicio(FECHA_INICIO)
        reserva.clickBotonActualizarLaReserva();
        expect(reserva.obtenerMensajeActualizarReserva()).toContain(MENSAJE_RESERVA_ACTUALIZADA);
    });
});
