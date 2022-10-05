import { Negocios } from './BusinessInterface';
import { Notifications } from './NotificationsInterface';
import { postChatResponse } from './ChatsInterface';
import { Follows } from './FavoritesInterface';

export interface confirmNumberResponse {
    status: number;
    access_token: string;
    token_type: string;
    expires_at: Date;
    user: User;
    business: Negocios[];
    notifications: Notifications[];
    chats: postChatResponse[];
    follows: Follows[]
}

export interface sendCodeResponse {
    status: number;

}

export interface RegisterResponse {
    status: number;
    token_type: string;
    expires_at: Date;
    user: User;
}

export interface User {
    id: string;
    name: string;
    apellido: string;
    sexo: string;
    edad: string;
    email: string;
    phone: string;
    dni: string;
    birth: string;
    rol: string;
    direccion: string;
    ciudad_id: string;
    sector_id: string;
    email_verified_at: string;
    phone_verified: string;
    register_verified: string;
    code_phone: string;
    access_token: string;
    deleted_at: string;
    created_at: Date;
    updated_at: Date;
}
