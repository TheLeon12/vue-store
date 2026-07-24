import { api } from '@/services/api'

import type { ProductQueryParams } from '@/types/api'
import type { Product, ProductsResponse } from '@/types/product'

export async function getProducts(
  params: ProductQueryParams = {},
): Promise<ProductsResponse> {
  const { limit = 12, skip = 0, sortBy, order } = params

  const { data } = await api.get<ProductsResponse>('/products', {
    params: {
      limit,
      skip,
      sortBy,
      order,
    },
  })

  return data
}

export async function getProductById(id: number): Promise<Product> {
  const { data } = await api.get<Product>(`/products/${id}`)

  return data
}