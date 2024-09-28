import apiAxios from "@/lib/services/apiAxios";

export async function getStates(): Promise<any> {
    return await apiAxios.get('dashboard')
}
