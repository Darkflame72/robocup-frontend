import axios from 'axios';
import { AxiosResponse } from 'axios'
import { apiUrl } from '@/env';

export default {
    async logInGetToken(username: string, password: string): Promise<AxiosResponse<any>> {
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);

        return axios.post(`${apiUrl}/api/v1/login/access-token`, params);
    },
    async passwordRecovery(email: string): Promise<AxiosResponse<any>> {
        return axios.post(`${apiUrl}/api/v1/password-recovery/${email}`);
    },
    async resetPassword(password: string, token: string): Promise<AxiosResponse<any>> {
        return axios.post(`${apiUrl}/api/v1/reset-password/`, {
            new_password: password,
            token,
        });
    },
}