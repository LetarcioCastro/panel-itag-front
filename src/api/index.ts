import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { toast } from 'sonner'

export let baseURL = 'http://localhost:8000/panel/'

export type FiltersType = {
  start_date?: string,
  end_date?: string,
  name?: string,
  page?: string | number,
  paginate?: string
}

export type apiResponseType = Promise<AxiosResponse & {
  ok: boolean
}>

const getMessage = (json: string) => {

  try {
    return JSON.parse(json) || {}
  } catch {
    return {}
  }

}

export const addInterceptorsResponse = (base: AxiosInstance) => {

  base.interceptors.response.use((response: AxiosResponse) => ({
    ...response,
    ok: response.status === 200
  }), (response) => {

    toast.error(getMessage(response.request?.response)?.message || `ERRO: ${response.code}`)

    if (response.response.status === 401) {
      window.location.href = '/login'
      // logout()
    }

    return {
      ...response,
      data: {},
      ok: false
    }

  })

  return base

}

export let api = axios.create({
  baseURL,
  headers: {
    'Accept': 'application/json'
  }
})

addInterceptorsResponse(api)

export let apiAuth = api

export const authorizeRest = ({ token }: { token: string }) => {

  apiAuth = axios.create({
    baseURL,
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })

  addInterceptorsResponse(apiAuth)

}

const setBaseURL = (URL: string) => {

  baseURL = URL

  api = axios.create({
    baseURL,
    headers: {
      'Accept': 'application/json'
    }
  })

  addInterceptorsResponse(api)

}

/*@ts-ignore*/
window.setBaseURL = setBaseURL
