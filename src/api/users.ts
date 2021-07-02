import axios from 'axios';
import { AxiosResponse } from 'axios'
import { apiUrl } from '@/env';
import { IUserProfile, IUserProfileUpdate, IUserProfileCreate } from '../interfaces';
import {authHeaders} from './utils'

export default {
    async getMe(token: string): Promise<AxiosResponse<IUserProfile>> {
        return axios.get<IUserProfile>(`${apiUrl}/api/v1/users/me`, authHeaders(token));
    },
    async updateMe(token: string, data: IUserProfileUpdate): Promise<AxiosResponse<IUserProfile>> {
        return axios.put<IUserProfile>(`${apiUrl}/api/v1/users/me`, data, authHeaders(token));
    },
    async getUsers(token: string): Promise<AxiosResponse<IUserProfile[]>> {
        return axios.get<IUserProfile[]>(`${apiUrl}/api/v1/users/`, authHeaders(token));
    },
    async updateUser(token: string, userId: number, data: IUserProfileUpdate): Promise<AxiosResponse<any>> {
        return axios.put(`${apiUrl}/api/v1/users/${userId}`, data, authHeaders(token));
    },
    async createUser(token: string, data: IUserProfileCreate): Promise<AxiosResponse<any>> {
        return axios.post(`${apiUrl}/api/v1/users/`, data, authHeaders(token));
    },
}