import axios from 'axios';
import type { Method, AxiosRequestConfig } from 'axios';

const baseUrl = 'http://47.108.190.192:8090';

const MyAxios = async (
    address: string,
    method: Method = 'GET',
    params: Record<string, any> = {},
    data: Record<string, any> = {}
): Promise<any> => {
    const url = `${baseUrl}${address}`;
    const config: AxiosRequestConfig = {
        url,
        method,
        params,
        data,
    };

    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};

export default MyAxios;