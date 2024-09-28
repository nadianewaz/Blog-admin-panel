import apiAxios from "@/lib/services/apiAxios";

// TODO: need to refactor and code for support server api calling

export async function login(user: any): Promise<any> {
    return await apiAxios.post('auth/login', user);
}

export async function logout(): Promise<any> {
    return await apiAxios.post('auth/logout');
}
