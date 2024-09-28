import apiAxios from "@/lib/services/apiAxios";

// @Types
import {PaginationType} from "@/models";


export async function chapterCreateApi(chapter: any): Promise<any> {
    return await apiAxios.post('chapters', chapter);
}

export async function chapterUpdateApi(chapter: any, id: string): Promise<any> {
    return await apiAxios.put(`chapters/${id}`, chapter);
}

export async function chapterDeleteApi(id: string): Promise<any> {
    return await apiAxios.post(`chapters/delete/${id}`);
}

export async function chapterListApi(pagination: PaginationType, filter: string = ''): Promise<any> {
    return await apiAxios.get(`chapters?page=${pagination.page}&limit=${pagination.size}${filter}`);
}
