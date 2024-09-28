import apiAxios from "@/lib/services/apiAxios";

// @Types
import {PaginationType} from "@/models";

export async function bannerCreateApi(newBanner: any): Promise<any> {
    return await apiAxios.post('banner/create', newBanner, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
}

export async function bannerUpdateApi(updatedBanner: any, id: string): Promise<any> {
    return await apiAxios.put(`banner/update/${id}`, updatedBanner)
}

export async function bannerDeleteApi(id: string): Promise<any> {
    return await apiAxios.delete(`banner/delete/${id}`)
}

export async function bannerListApi(pagination: PaginationType, filter: string = ''): Promise<any> {
    return await apiAxios.get(`banner?page=${pagination.page}&limit=${pagination.size}${filter}`)
}
