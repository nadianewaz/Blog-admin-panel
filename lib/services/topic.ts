import apiAxios from "@/lib/services/apiAxios";

// @Types
import {PaginationType} from "@/models/paginationType";

export async function topicCreateApi(topic: any): Promise<any> {
    return await apiAxios.post('topics', topic)
}

export async function topicUpdateApi(topic: any, id: string): Promise<any> {
    return await apiAxios.put(`topics/${id}`, topic)
}

export async function topicDeleteApi(id: string): Promise<any> {
    return await apiAxios.post(`topics/delete/${id}`)
}

export async function topicListApi(pagination: PaginationType, filter: string = ''): Promise<any> {
    return await apiAxios.get(`topics?page=${pagination.page}&limit=${pagination.size}${filter}`)
}
