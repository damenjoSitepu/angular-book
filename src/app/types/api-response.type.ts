export interface BaseApiResponse<T> {
  message: string;
  data: T;
}

export type ApiResponse<T> = BaseApiResponse<T>;