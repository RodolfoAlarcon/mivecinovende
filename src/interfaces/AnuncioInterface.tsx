export interface registerAnuncio {
    data: Anuncio;
    status: string;
}

export interface editAnuncio {
    data: Anuncio;
    status: string;
}


export interface Anuncio {
    category:      string;
    comment:       string;
    created_at:    Date;
    id:            string;
    quantity:      number;
    rank:          string;
    status:        number;
    status_system: number;
    subcategory:   string;
    updated_at:    Date;
    user_id:       string;
}