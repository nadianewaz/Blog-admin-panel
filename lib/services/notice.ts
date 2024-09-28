import apiAxios from "@/lib/services/apiAxios";

// @Types
import {PaginationType} from "@/models";


export async function noticeCreateApi(notice: any): Promise<any> {
    return await apiAxios.post('notice', notice, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
}

export async function noticeUpdateApi(notice: any, id: string): Promise<any> {
    return await apiAxios.put(`notice/${id}`, notice, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
}

export async function noticeDeleteApi(id: string): Promise<any> {
    return await apiAxios.delete(`notice/${id}`);
}

export async function noticeListApi(pagination: PaginationType, filter: string = ''): Promise<any> {
    return await apiAxios.get(`notice?page=${pagination.page}&limit=${pagination.size}${filter}`);
}
