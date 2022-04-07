export interface DataForm {
    marcas:       Marca[];
    tipoVehiculo: TipoVehiculo[];
    repuestos:    Repuesto[];
    modeleos:     Modelos[];
    motores:       Motores[];
}

export interface Marca {
    id:         string;
    nombre:     string;
    created_at: Date;
    updated_at: Date;
}

export interface TipoVehiculo {
    id:         string;
    nombre:     string;
    created_at: Date;
    updated_at: Date;
}

export interface Repuesto {
    id:               string;
    nombre:           string;
    created_at:       Date;
    updated_at:       Date;
    marca_id:         string;
    tipo_vehiculo_id: string;
}
export interface Modelos {
id:               string;
nombre:           string;
created_at:       Date;
updated_at:       Date;
marca_id:         string;
tipo_vehiculo_id: string;
}

export interface Motores {
    id:         string;
    nombre:     string;
    created_at: Date;
    updated_at: Date;
}

export interface Motores {
    id:         string;
    nombre:     string;
    created_at: Date;
    updated_at: Date;
}

export interface Address {
    countrys: Country[];
    citys:    City[];
    sectors: Sectors[];
}

export interface Country {
    id:           string;
    nombre:       string;
    code_country: string;
    status:       number;
    created_at:   Date;
    updated_at:   Date;
}

export interface City {
    id:            string;
    nombre:        string;
    status:        number;
    paises_id:   string;
    created_at:    Date;
    updated_at:    Date;
    code_country?: string;
}

export interface Sectors {
    id:            string;
    nombre:        string;
    ciudades_id:   string;
    created_at:    Date;
    updated_at:    Date;
    code_country?: string;
}