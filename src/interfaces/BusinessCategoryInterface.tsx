export interface RegisterBusinessCategoryResponse {
    status:    string;
    product:   BusinessCategory;

}

export interface EditBusinessCategoryResponse {
    status:    string;
    product:   BusinessCategory;

}

export interface BusinessCategory {
    id: string;
    business_id: string;
    name: string;
    url_imagen: string;
    created_at: Date;
    updated_at: Date;

}

