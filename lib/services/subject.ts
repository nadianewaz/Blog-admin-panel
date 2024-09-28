import apiAxios from "@/lib/services/apiAxios";

// @Types
import {PaginationType} from "@/models/paginationType";

export async function subjectCreateApi(subject: any): Promise<any> {
    return await apiAxios.post('subjects', subject)
}

export async function subjectUpdateApi(subject: any, id: string): Promise<any> {
    return await apiAxios.put(`subjects/${id}`, subject)
}

export async function subjectDeleteApi(id: string): Promise<any> {
    return await apiAxios.post(`subjects/delete/${id}`)
}

export async function subjectListApi(pagination: PaginationType, filter: string = ''): Promise<any> {
    return await apiAxios.get(`subjects?page=${pagination.page}&limit=${pagination.size}${filter}`)
}
