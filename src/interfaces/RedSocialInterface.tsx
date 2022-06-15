export interface RegisterRedResponse {
    status:    string;
    red:   Red;

}

export interface EditRedResponse {
    status:    string;
    red:   Red;

}

export interface Red {
    id:               string;
    business_id:      string;
    red_social:      string;
    redsocial_url:   string;
    created_at:       Date;
    updated_at:       Date;
    
}

