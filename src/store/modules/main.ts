import login from '@/api/login';
import users from '@/api/users';

import router from '@/router';
import { getLocalToken, removeLocalToken, saveLocalToken } from '@/utils';
import { AxiosError } from 'axios';
import { MainState, AppNotification } from './state';
import { IUserProfile, IUserProfileUpdate } from '@/interfaces';


const state = (): MainState => ({
    token: '',
    isLoggedIn: null,
    logInError: false,
    userProfile: null,
    notifications: []
})

// mutations
const mutations = {
    setToken(state: MainState, payload: string): void {
        state.token = payload;
    },
    setLoggedIn(state: MainState, payload: boolean): void {
        state.isLoggedIn = payload;
    },
    setLogInError(state: MainState, payload: boolean): void {
        state.logInError = payload;
    },
    setUserProfile(state: MainState, payload: IUserProfile): void {
        state.userProfile = payload;
    },
    addNotification(state: MainState, payload: AppNotification): void {
        state.notifications.push(payload);
    },
    removeNotification(state: MainState, payload: AppNotification): void {
        state.notifications = state.notifications.filter((notification) => notification !== payload);
    },
}

// getters
const getters = {
    hasAdminAccess: (state: MainState): boolean | null => {
        return (
            state.userProfile &&
            state.userProfile.is_superuser && state.userProfile.is_active);
    },
    loginError: (state: MainState): boolean => state.logInError,
    userProfile: (state: MainState): IUserProfile | null => state.userProfile,
    token: (state: MainState): string => state.token,
    isLoggedIn: (state: MainState): boolean | null => state.isLoggedIn,
}

// actions
const actions = {
    async actionLogIn(state: MainState, payload: { username: string; password: string }): Promise<void> {
        try {
            const response = await login.logInGetToken(payload.username, payload.password);
            const token = response.data.access_token;
            if (token) {
                saveLocalToken(token);
                mutations.setToken(state, token);
                mutations.setLoggedIn(state, true);
                mutations.setLogInError(state, false);
                await this.actionGetUserProfile(state);
                this.actionRouteLoggedIn(state);
                mutations.addNotification(state, { content: 'Logged in', color: 'success' });
            } else {
                await this.actionLogOut(state);
            }
        } catch (err) {
            mutations.setLogInError(state, true);
            await this.actionLogOut(state);
        }
    },
    async actionGetUserProfile(state: MainState): Promise<void> {
        try {
            const response = await users.getMe(state.token);
            if (response.data) {
                mutations.setUserProfile(state, response.data);
            }
        } catch (error) {
            await this.actionCheckApiError(state, error);
        }
    },
    async actionUpdateUserProfile(state: MainState, payload: IUserProfileUpdate): Promise<void> {
        try {
            const loadingNotification = { content: 'saving', showProgress: true };
            mutations.addNotification(state, loadingNotification);
            const response = (await Promise.all([
                users.updateMe(state.token, payload),
                await new Promise<void>((resolve, reject) => setTimeout(() => resolve(), 500)),
            ]))[0];
            mutations.setUserProfile(state, response.data);
            mutations.removeNotification(state, loadingNotification);
            mutations.addNotification(state, { content: 'Profile successfully updated', color: 'success' });
        } catch (error) {
            await this.actionCheckApiError(state, error);
        }
    },
    async actionCheckLoggedIn(state: MainState): Promise<void> {
        if (!state.isLoggedIn) {
            let token = state.token;
            if (!token) {
                const localToken = getLocalToken();
                if (localToken) {
                    mutations.setToken(state, localToken);
                    token = localToken;
                }
            }
            if (token) {
                try {
                    const response = await users.getMe(token);
                    mutations.setLoggedIn(state, true);
                    mutations.setUserProfile(state, response.data);
                } catch (error) {
                    await this.actionRemoveLogIn(state);
                }
            } else {
                await this.actionRemoveLogIn(state);
            }
        }
    },
    async actionRemoveLogIn(state: MainState): Promise<void> {
        removeLocalToken();
        mutations.setToken(state, '');
        mutations.setLoggedIn(state, false);
    },
    async actionLogOut(state: MainState): Promise<void> {
        this.actionRouteLoggedIn(state);
        this.actionRouteLogOut(state);
    },
    async actionUserLogOut(state: MainState): Promise<void> {
        await this.actionLogOut(state);
        mutations.addNotification(state, { content: 'Logged out', color: 'success' });
    },
    actionRouteLogOut(state: MainState): void {
        if (router.currentRoute.path !== '/login') {
            router.push('/login');
        }
    },
    async actionCheckApiError(state: MainState, payload: AxiosError): Promise<void> {
        if (payload.response?.status === 401) {
            await this.actionLogOut(state);
        }
    },
    actionRouteLoggedIn(state: MainState): void {
        if (router.currentRoute.path === '/login' || router.currentRoute.path === '/') {
            router.push('/main');
        }
    },
    async removeNotification(state: MainState, payload: { notification: AppNotification, timeout: number }): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                mutations.removeNotification(state, payload.notification);
                resolve(true);
            }, payload.timeout);
        });
    },
    async passwordRecovery(state: MainState, payload: { username: string }): Promise<void> {
        const loadingNotification = { content: 'Sending password recovery email', showProgress: true };
        try {
            mutations.addNotification(state, loadingNotification);
            const response = (await Promise.all([
                login.passwordRecovery(payload.username),
                await new Promise<void>((resolve, reject) => setTimeout((): void => resolve(), 500)),
            ]))[0];
            mutations.removeNotification(state, loadingNotification);
            mutations.addNotification(state, { content: 'Password recovery email sent', color: 'success' });
            await this.actionLogOut(state);
        } catch (error) {
            mutations.removeNotification(state, loadingNotification);
            mutations.addNotification(state, { color: 'error', content: 'Incorrect username' });
        }
    },
    async resetPassword(state: MainState, payload: { password: string, token: string }): Promise<void> {
        const loadingNotification = { content: 'Resetting password', showProgress: true };
        try {
            mutations.addNotification(state, loadingNotification);
            const response = (await Promise.all([
                login.resetPassword(payload.password, payload.token),
                await new Promise<void>((resolve, reject) => setTimeout((): void => resolve(), 500)),
            ]))[0];
            mutations.removeNotification(state, loadingNotification);
            mutations.addNotification(state, { content: 'Password successfully reset', color: 'success' });
            await this.actionLogOut(state);
        } catch (error) {
            mutations.removeNotification(state, loadingNotification);
            mutations.addNotification(state, { color: 'error', content: 'Error resetting password' });
        }
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}