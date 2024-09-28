import apiAxios from "@/lib/services/apiAxios";

// @Types
import {PaginationType} from "@/models";


export async function liveTestImagesUploadApi(imagesPayload: any): Promise<any> {
    return await apiAxios.post('liveTestQuestions/images/uploads', imagesPayload, {
        headers: {
            'Content-Type': 'application/xml'
        }
    })
}

export async function liveTestImageListApi(pagination: PaginationType, filter: string = ''): Promise<any> {
    return await apiAxios.get(`liveTestQuestions/images/list?page=${pagination.page}&limit=${pagination.size}${filter}`)
}
