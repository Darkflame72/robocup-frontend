export const getLocalToken = (): string | null => localStorage.getItem('token');

export const saveLocalToken = (token: string): void => localStorage.setItem('token', token);

export const removeLocalToken = (): void => localStorage.removeItem('token');
