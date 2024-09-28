import apiAxios from "@/lib/services/apiAxios";


export async function configureUpdateCreateApi(config: any): Promise<any> {
    return await apiAxios.post('configure', config)
}

