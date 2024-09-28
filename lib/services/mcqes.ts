import apiAxios from "@/lib/services/apiAxios";

// @Types
import {PaginationType} from "@/models/paginationType";

export async function mcqCreateApi(newMcq: any): Promise<any> {
    return await apiAxios.post('questions', newMcq)
}

export async function mcqUpdateApi(updatedMcq: any, id: string): Promise<any> {
    return await apiAxios.put(`questions/${id}`, updatedMcq)
}

export async function mcqDeleteApi(id: string): Promise<any> {
    return await apiAxios.post(`questions/${id}`)
}

export async function mcqGetByIdApi(id: string | any): Promise<any> {
    return await apiAxios.get(`questions/${id}`)
}

export async function mcqListApi(pagination: PaginationType, filter: string = ''): Promise<any> {
    return await apiAxios.get(`questions?page=${pagination.page}&limit=${pagination.size}${filter}`)
}