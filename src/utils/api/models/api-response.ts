import type { AxiosResponse } from "axios"
import type { ApiResponseModel } from '@/utils/api/models/api-response-model'

// export type ApiResponse<T = any> = AxiosResponse<ApiResponseModel<T>>
export type ApiResponse<T = any> = ApiResponseModel<T>
