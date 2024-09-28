import apiAxios from "@/lib/services/apiAxios";

// @Types
import {PaginationType} from "@/models/paginationType";

export async function feedbackListApi(pagination: PaginationType, status?: string, filter: string = ''): Promise<any> {
    return await apiAxios.get(`feedback/counts?page=${pagination.page}&limit=${pagination.size}${filter}&status=${status}`)
}