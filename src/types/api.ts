export interface ApiError {
  message: string
  status?: number
}

export interface PaginationParams {
  limit?: number
  skip?: number
}

export interface ProductQueryParams extends PaginationParams {
  sortBy?: string
  order?: 'asc' | 'desc'
}