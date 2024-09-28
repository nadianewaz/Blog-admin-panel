import apiAxios from "@/lib/services/apiAxios";

// @Types
import {PaginationType} from "@/models";


export async function imagesUploadApi(imagesPayload: any): Promise<any> {
  return await apiAxios.post('questions/images/uploads', imagesPayload, {
    headers: {
      'Content-Type': 'application/xml'
    }
  })
}

export async function imageListApi(pagination: PaginationType, filter: string = ''): Promise<any> {
  return await apiAxios.get(`questions/images/list?page=${pagination.page}&limit=${pagination.size}${filter}`)
}
