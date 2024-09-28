// @Types
import apiAxios from "@/lib/services/apiAxios";
import {PaginationType} from "@/models/paginationType";


export async function feedbackDetailsListApi(id: string | any, pagination: PaginationType, status?: string, filter: string = ''): Promise<any> {
    try {
        const response = await apiAxios.get(`feedback/list?question=${id}&page=${pagination.page}&limit=${pagination.size}${filter}&status=${status}`);
        return response.data;
    } catch (error) {
        throw error; // Re-throw the error to be handled by the caller
    }
}

export async function sendFeedback(feedbackPayload : any, id: string | any ): Promise<any> {
    try {
        const response = await apiAxios.put(`feedback/${id}`, feedbackPayload );
        return response;
    } catch (error) {
        throw error; // Re-throw the error to be handled by the caller
    }
}

