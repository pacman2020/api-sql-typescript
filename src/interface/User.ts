export interface User {
    id?: string;
    username: string;
    email: string;
    password: string;
    admin?: Boolean;
    created_at?: Date;
}