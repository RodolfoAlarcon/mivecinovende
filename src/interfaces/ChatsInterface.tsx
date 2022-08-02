export interface getChatsResponse {
    data: postChatResponse[];
}

export interface createChatResponse {
    status:       number;
    id: string;
    name: string;
    id_user: string;
    id_business: string;
    chat:         Chat;
    created_at:  Date;
    updated_at:  Date;

}

export interface postChatResponse {
    status:       number;
    id: string;
    name: string;
    id_user: string;
    id_business: string;
    chat:         Chat;
    created_at:  Date;
    updated_at:  Date;

}

export interface Chat {
    id: string;
    sender: string;
    msg: string;
    time: Date;
    date:  Date;
  }