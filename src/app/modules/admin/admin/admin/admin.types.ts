export interface AdminPagination
{
    length: number;
    size: number;
    page: number;
    lastPage: number;
    startIndex: number;
    endIndex: number;
}


export interface Admin
{
    id: string;
    parent: string;
    name: string;
    slug: string;
    icon: string;
    cover: string;
    description: string;
}


