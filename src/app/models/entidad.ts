import { Contribuyente } from "./contribuyente";
import { Documento } from "./documento";

export class Entidad {

    id_entidad: number;
    direccion: string;
    nombre_comercial: string;
    nro_documento: string;
    razon_social: string;
    telefono: string;
    documento: Documento;
    contribuyente: Contribuyente;
    estado: boolean
}

