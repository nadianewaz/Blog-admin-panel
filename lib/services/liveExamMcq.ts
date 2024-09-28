import apiAxios from "@/lib/services/apiAxios";
// @Types
import {PaginationType} from "@/models/paginationType";

export async function LiveTestMcqCreateApi(newMcq: any): Promise<any> {
    return await apiAxios.post('liveTestQuestions', newMcq)
}
//
export async function liveTestMcqUpdateApi(updatedMcq: any, id: string): Promise<any> {
    return await apiAxios.put(`liveTestQuestions/${id}`, updatedMcq)
}

export async function LiveTestMeqDeleteApi(id: string): Promise<any> {
    return await apiAxios.delete(`liveTestQuestions/${id}`)
}

export async function liveTestMcqGetByIdApi(id: string | any): Promise<any> {
    return await apiAxios.get(`liveTestQuestions/${id}`)
}

export async function liveTestMcqListApi(pagination: PaginationType, filter: string = ''): Promise<any> {
    return await apiAxios.get(`liveTestQuestions?page=${pagination.page}&limit=${pagination.size}${filter}`)
}