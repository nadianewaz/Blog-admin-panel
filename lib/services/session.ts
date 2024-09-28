import apiAxios from "@/lib/services/apiAxios";

// @Types
import {PaginationType} from "@/models/paginationType";


export async function sessionDeleteApi(id: string): Promise<any> {
    return await apiAxios.delete(`session/${id}`)
}

export async function sessionListApi(pagination: PaginationType, filter: string = ''): Promise<any> {
    return await apiAxios.get(`session?page=${pagination.page}&limit=${pagination.size}${filter}`)
}
