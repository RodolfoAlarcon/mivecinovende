export interface RegisterServiceResponse {
    status:    string;
    service:   Service;

}

export interface EditServiceResponse {
    status:    string;
    service:   Service;

}

export interface Service {
    id:               string;
    business_id:      string;
    servicio:      string;
    created_at:       Date;
    updated_at:       Date;
    
}

