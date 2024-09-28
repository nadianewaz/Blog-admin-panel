import apiAxios from "@/lib/services/apiAxios";

// @Types
import {PaginationType} from "@/models/paginationType";


export async function refundListApi(pagination: PaginationType, filter: string = '', status?: string): Promise<any> {
    return await apiAxios.get(`refund?page=${pagination.page}&limit=${pagination.size}&status=${status}${filter}`)
}
