export interface Task {
    id?: string;
    title: string;
    description: string;
    user_id: number;
    created_at?: Date;
}