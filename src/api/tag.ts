import { apiAuth, apiResponseType } from ".";

export const createTag = (data: any) => apiAuth.post('/tags/store', data) as apiResponseType

export const updateTag = (uuid: string, data: any) => apiAuth.put(`/tags/${uuid}/update`, data) as apiResponseType

export const deleteTag = (uuid: string) => apiAuth.delete(`/tags/${uuid}/destroy`) as apiResponseType
