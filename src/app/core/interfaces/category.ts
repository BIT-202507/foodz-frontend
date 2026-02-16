export interface Category {
    _id: string;
    name: string;
    slug?: string;
    description?: string;
    parent_id?: string | Category;
    level: number;
    childrenCount: number;
    isActive: boolean;
}
