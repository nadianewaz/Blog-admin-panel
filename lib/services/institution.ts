import apiAxios from "@/lib/services/apiAxios";

// @Types
import {PaginationType} from "@/models/paginationType";


export async function institutesCreateApi(institutes: any): Promise<any> {
    return await apiAxios.post('institutions', institutes)
}

export async function institutesUpdateApi(institutes: any, id: string): Promise<any> {
    return await apiAxios.put(`institutions/${id}`, institutes)
}

export async function institutesDeleteApi(id: string): Promise<any> {
    return await apiAxios.post(`institutions/delete/${id}`)
}

export async function institutesListApi(pagination: PaginationType, filter: string = ''): Promise<any> {
    return await apiAxios.get(`institutions?page=${pagination.page}&limit=${pagination.size}${filter}`)
}

export async function districtListApi(pagination: PaginationType, filter: string = ''): Promise<any> {
    return await apiAxios.get(`districts?page=${pagination.page}&limit=${pagination.size}${filter}`)
}
