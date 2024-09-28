import apiAxios from "@/lib/services/apiAxios";

// @Types
import {PaginationType} from "@/models";


export async function qrCreateApi(qrRegister: any): Promise<any> {
    return await apiAxios.post('codes/generate', qrRegister)
}

export async function qrListApi(pagination: PaginationType, filter: string = ''): Promise<any> {
    return await apiAxios.get(`codes/audit-list?page=${pagination.page}&limit=${pagination.size}${filter}`)
}

export async function getQrCodesByIdApi(id: string): Promise<any> {
    return await apiAxios.get(`codes/${id}`)
}
