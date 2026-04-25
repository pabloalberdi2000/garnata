import { useState, useEffect } from 'react'
import { contentfulService, Product, Collection, StoreInfo } from '../services/contentfulService'

interface UseDataResult<T> {
  data: T | null
  loading: boolean
  error: string | null
}

const useContentful = <T,>(
  fetchFunction: () => Promise<T>,
  dependencies: unknown[] = []
): UseDataResult<T> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await fetchFunction()
        setData(result)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, dependencies)

  return { data, loading, error }
}

export const useProducts = (collection: string | null = null): UseDataResult<Product[]> => {
  return useContentful(
    () => contentfulService.getProducts(collection),
    [collection]
  )
}

export const useProduct = (productId: string): UseDataResult<Product> => {
  return useContentful(
    () => contentfulService.getProductById(productId) as Promise<Product>,
    [productId]
  )
}

export const useCollections = (): UseDataResult<Collection[]> => {
  return useContentful(() => contentfulService.getCollections(), [])
}

export const useStoreInfo = (): UseDataResult<StoreInfo> => {
  return useContentful(() => contentfulService.getStoreInfo() as Promise<StoreInfo>, [])
}
