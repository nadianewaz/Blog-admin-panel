import apiAxios from "@/lib/services/apiAxios";

// @Types
// import {PaginationType} from "@/models";

export async function courseCreateApi(courseRegister: any): Promise<any> {
    return await apiAxios.post('courses', courseRegister)
}

export async function courseUpdateApi(courseUpdate: any, id: string): Promise<any> {
    return await apiAxios.put(`courses/${id}`, courseUpdate)
}

export async function courseDeleteApi(id: string): Promise<any> {
    return await apiAxios.post(`courses/delete/${id}`)
}

export async function courseListApi( filter: string = ''): Promise<any> {
    // return await apiAxios.get(`courses?page=${pagination.page}&limit=${pagination.size}${filter}`)
}
