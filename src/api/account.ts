import { apiAuth, apiResponseType, FiltersType } from ".";

export const getAccounts = (params?: FiltersType) => apiAuth.get('/accounts', { params })

export const getAccount = (uuid: string) => apiAuth.get(`/accounts/${uuid}/show`) as apiResponseType

export const createAccount = (data: any) => apiAuth.post('/accounts/store', data) as apiResponseType

export const deleteAccount  = (uuid: string) => apiAuth.delete(`/accounts/${uuid}/destroy`) as apiResponseType

export const updateAccount  = (uuid: string, data: any) => apiAuth.put(`/accounts/${uuid}/update`, data) as apiResponseType

export const getAccountTags = (uuid: string, params: { code?: string, alias?: string } = {}) => apiAuth.get(`/tags`, {
  params: {
    account_uuid: uuid,
    ...params,
  }
}) as apiResponseType