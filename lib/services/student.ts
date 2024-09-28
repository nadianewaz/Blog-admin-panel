import apiAxios from "@/lib/services/apiAxios";

// @Types
import {PaginationType} from "@/models/paginationType";

export async function studentListApi(pagination: PaginationType, filter: string = ''): Promise<any> {
    return await apiAxios.get(`students?page=${pagination.page}&limit=${pagination.size}${filter}`)
}
export async function studentStatusChangeApi(_id: string): Promise<any> {
    return await apiAxios.post(`students/status/${_id}`)
}
export async function studentGetByIdApi(id: string | any): Promise<any> {
    return await apiAxios.get(`students/${id}`)
}