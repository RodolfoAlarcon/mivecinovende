import { Red } from './RedSocialInterface';
import {BusinessCategory} from './BusinessCategoryInterface';
import {Product} from './ProductInterface';
import { Service } from './ServiceInterface';
export interface EditNegocioResponse {
    status:    string;
    negocio:   Negocios;

}

export interface Negocios {
    id:               string;
    subcategory_id:   string;
    sectores_id:      string;
    name:             string;
    description:      string;
    url_logo:         string;
    sitio_web:        null;
    phone:            string;
    email:            null;
    delivery:         string;
    direccion:        string;
    url_catalogo:     null;
    horario_atencion: null;
    user_id:          string;
    created_at:       Date;
    updated_at:       Date;
    taggables:        Etiqueta[];
    redSocial:        Red[];
    categorias:     BusinessCategory[];
    productos:      Product[];
    servicios:        Service[];
}

export interface Etiqueta {
    id:          string;
    business_id: string;
    tags_id:     string;
    created_at:  Date;
    updated_at:  Date;
}
