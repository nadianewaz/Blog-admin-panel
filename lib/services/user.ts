import apiAxios from "@/lib/services/apiAxios";

// @Types
import {PaginationType} from "@/models/paginationType";

export async function userChangedPasswordApi(user: any): Promise<any> {
    return await apiAxios.put('users/change-password', user)
}

export async function userCreateApi(user: any): Promise<any> {
    return await apiAxios.post('users/register', user)
}

export async function userUpdateApi(user: any, id: string): Promise<any> {
    return await apiAxios.put(`users/${id}`, user)
}

export async function userDeleteApi(id: string): Promise<any> {
    return await apiAxios.post(`users/delete/${id}`)
}

export async function userListApi(pagination: PaginationType, filter: string = ''): Promise<any> {
    return await apiAxios.get(`users?page=${pagination.page}&limit=${pagination.size}${filter}`)
}
