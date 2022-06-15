import { Negocios } from './BusinessInterface';
import { Notifications } from './NotificationsInterface';

export interface confirmNumberResponse {
    status:       number;
    access_token: string;
    token_type:   string;
    expires_at:   Date;
    user:         User;
    business:   Negocios[];
    notifications: Notifications[];
}

export interface sendCodeResponse {
    status:       number;

}

export interface RegisterResponse {
    status:       number;
    token_type:   string;
    expires_at:   Date;
    user:         User;
}

export interface User {
    id:                string;
    name:              null;
    email:             null;
    phone:             string;
    dni:               null;
    birth:             null;
    rol:               string;
    email_verified_at: null;
    phone_verified:    string;
    register_verified: string;
    code_phone:        string;
    access_token:     string;
    deleted_at:        null;
    created_at:        Date;
    updated_at:        Date;
}
