import { apiAuth, apiResponseType } from ".";

export const getUsers = () => apiAuth.get('/users')

export const createUser = (data: any) => apiAuth.post('/users/store', data) as apiResponseType