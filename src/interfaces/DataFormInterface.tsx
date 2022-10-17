export interface Address {
    countrys: Country[];
    citys:    City[];
    provinces: Provinces[];
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

export interface Provinces {
    id:            string;
    nombre:        string;
    status:        number;
    paises_id:   string;
    created_at:    Date;
    updated_at:    Date;
    code_country?: string;
}

export interface City {
    id:            string;
    nombre:        string;
    status:        number;
    provincia_id:   string;
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