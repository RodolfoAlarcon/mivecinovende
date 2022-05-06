export interface getNotificationsResponse {
    data: Notifications[];
}

export interface Notifications {
    id:           string;
    user_id:      string;
    bussiness_id: string;
    type:         string;
    content:      Content;
    status:       number;
    created_at:   Date;
    updated_at:   Date;
}

export interface Content {
    titulo:    string;
    nombre:    string;
    telefono:  string;
    correo:    string;
    direccion: string;
}
