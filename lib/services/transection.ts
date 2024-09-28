import apiAxios from "@/lib/services/apiAxios";

// @Types
import {PaginationType} from "@/models/paginationType";

export async function transactionListApi(pagination: PaginationType, status?: string, filter?: string): Promise<any> {
    return await apiAxios.get(`payments?page=${pagination.page}&limit=${pagination.size}${filter}&status=${status}`)
}