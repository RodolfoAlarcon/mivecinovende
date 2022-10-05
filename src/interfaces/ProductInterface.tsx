export interface RegisterProductResponse {
    status:    string;
    product:   Product;

} 

export interface EditProductResponse {
    status:    string;
    product:   Product;

}

export interface Product {
    id:               string;
    producto:      string;
    url_imagen:      string;
    descripcion:      string;
    precio:      string;
    bussinesCategoryId: string;
    business_id:      string;
    slider:           [];
    created_at:       Date;
    updated_at:       Date;
    
}

