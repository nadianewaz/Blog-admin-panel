import apiAxios from "@/lib/services/apiAxios";

// @Types
import {PaginationType} from "@/models";

export async function classCreateApi(newClass: any): Promise<any> {
    return await apiAxios.post('classes', newClass)
}

export async function classUpdateApi(updatedClass: any, id: string): Promise<any> {
    return await apiAxios.put(`classes/${id}`, updatedClass)
}

export async function classDeleteApi(id: string): Promise<any> {
    return await apiAxios.post(`classes/delete/${id}`)
}

export async function classListApi(pagination: PaginationType, filter: string = ''): Promise<any> {
    return await apiAxios.get(`classes?page=${pagination.page}&limit=${pagination.size}${filter}`)
}
