import type { AxiosRequestConfig } from 'axios'
import type { ApiResponse } from '@/utils/api/models/api-response'
import axios from '@/utils/api/axios-instance'

export class ApiFactory {
  protected apiUrl: string

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl
  }

  /** GET 方法 */
  protected get<Params, Response = ApiResponse>(
    url: string,
    params?: Params,
    config?: AxiosRequestConfig
  ): Promise<Response> {
    console.log("[GET] method: ", url, params, config)
    return axios.get(`${this.apiUrl}/${url}`, { params, ...config })
  }

  /** POST 方法 */
  protected post<Body, Response = ApiResponse>(
    url: string,
    body: Body,
    config?: AxiosRequestConfig
  ): Promise<Response> {
    console.log("[POST] method: ", url, body, config)
    return axios.post(`${this.apiUrl}/${url}`, body, config)
  }

  /** PUT 方法 */
  protected put<Body, Response = ApiResponse>(
    url: string,
    body: Body,
    config?: AxiosRequestConfig
  ): Promise<Response> {
    console.log("[PUT] method: ", url, body, config)
    return axios.put(`${this.apiUrl}/${url}`, body, config)
  }

}