export interface ApiError {
  message: string
  status?: number
}

export type SortOrder = 'asc' | 'desc'

export type ProductSortField = '' | 'title' | 'price' | 'rating' | 'stock'

export interface PaginationParams {
  limit?: number
  skip?: number
}

export interface ProductQueryParams extends PaginationParams {
  search?: string
  category?: string
  sortBy?: ProductSortField
  order?: SortOrder
}
