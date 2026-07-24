import { api } from '@/services/api'

import type {
  ProductQueryParams,
  ProductSortField,
  SortOrder,
} from '@/types/api'
import type { Product, ProductsResponse } from '@/types/product'

interface ProductRequestParams {
  limit: number
  skip: number
  sortBy?: ProductSortField
  order?: SortOrder
}

export async function getProducts(
  params: ProductQueryParams = {},
): Promise<ProductsResponse> {
  const { limit = 12, skip = 0, sortBy = '', order = 'asc' } = params

  const requestParams: ProductRequestParams = {
    limit,
    skip,
  }

  if (sortBy) {
    requestParams.sortBy = sortBy
    requestParams.order = order
  }

  const { data } = await api.get<ProductsResponse>('/products', {
    params: requestParams,
  })

  return data
}

export async function searchProducts(
  query: string,
  params: ProductQueryParams = {},
): Promise<ProductsResponse> {
  const { limit = 12, skip = 0, sortBy = '', order = 'asc' } = params

  const requestParams: ProductRequestParams & { q: string } = {
    q: query,
    limit,
    skip,
  }

  if (sortBy) {
    requestParams.sortBy = sortBy
    requestParams.order = order
  }

  const { data } = await api.get<ProductsResponse>('/products/search', {
    params: requestParams,
  })

  return data
}

export async function getProductsByCategory(
  category: string,
  params: ProductQueryParams = {},
): Promise<ProductsResponse> {
  const { limit = 12, skip = 0, sortBy = '', order = 'asc' } = params

  const requestParams: ProductRequestParams = {
    limit,
    skip,
  }

  if (sortBy) {
    requestParams.sortBy = sortBy
    requestParams.order = order
  }

  const encodedCategory = encodeURIComponent(category)

  const { data } = await api.get<ProductsResponse>(
    `/products/category/${encodedCategory}`,
    {
      params: requestParams,
    },
  )

  return data
}

export async function getProductCategories(): Promise<string[]> {
  const { data } = await api.get<string[]>('/products/category-list')

  return data
}

export async function getProductById(id: number): Promise<Product> {
  const { data } = await api.get<Product>(`/products/${id}`)

  return data
}
