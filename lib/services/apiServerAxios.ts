import axios from 'axios';

const apiUrl: string | undefined = process.env.NEXT_PUBLIC_API_URL;

// @Services
import {CookieService} from "@/lib/utils/CookieService";

const token = CookieService.getCookie('accessToken')

// Creating an Axios instance
const apiServerAxios = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
    // You can add default headers here
});

// Request Interceptor
apiServerAxios.interceptors.request.use(
    config => {
        // Perform actions before the request is sent
        console.log(`Sending a ${config.method} request to ${config.url}...`);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        config.headers['Content-Type'] = 'application/json';

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Response Interceptor
apiServerAxios.interceptors.response.use(
    response => {
        // console.log('Response:', response);
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export default apiServerAxios;
