import { Anuncio } from './AnuncioInterface';

export interface LoginResponse {
    status:       number;
    access_token: string;
    token_type:   string;
    expires_at:   Date;
    user:         User[];

}

export interface RegisterResponse {
    status:       number;
    access_token: string;
    token_type:   string;
    expires_at:   Date;
    user:         User;
}


export interface LoginResponse {
    status:       number;
    access_token: string;
    token_type:   string;
    expires_at:   Date;
    user:         User[];
    groups:       Group[];
    anuncios:      Anuncio[];
}

export interface Group {
    name: string;
}

export interface User {
    id:                string;
    name:              string;
    email:             string;
    dni:             string;
    phone:             string;
    birth:             string;
    email_verified_at?: null;
    deleted_at?:        null;
    created_at?:        Date;
    updated_at?:        Date;
}
