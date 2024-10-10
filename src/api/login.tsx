import { api, apiResponseType } from ".";

export const login = (data: { email: string, password: string }) => api.post('/login', data) as apiResponseType