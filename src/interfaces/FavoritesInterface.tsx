export interface FollowBusinessResponse {
    status:    string;
    follow:   Follows;

}

export interface UnFollowBusinessResponse {
    status:    string;

}

export interface Follows {
    id: string;
    business_id: string;
    id_user: string;
    created_at: Date;
    updated_at: Date;

}
