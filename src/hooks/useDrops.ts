import { useState, useEffect } from 'react'
import { contentfulService, Drop, BrandInfo } from '../services/contentfulService'

interface UseDataResult<T> {
  data: T
  loading: boolean
  error: Error | null
}

export const useDrops = (): UseDataResult<Drop[]> => {
  const [data, setData] = useState<Drop[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchDrops = async () => {
      try {
        setLoading(true)
        const drops = await contentfulService.getDrops()
        setData(drops)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        setLoading(false)
      }
    }

    fetchDrops()
  }, [])

  return { data, loading, error }
}

export const useDropById = (dropId: string): UseDataResult<Drop | null> => {
  const [data, setData] = useState<Drop | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchDrop = async () => {
      try {
        setLoading(true)
        const drop = await contentfulService.getDropById(dropId)
        setData(drop)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        setLoading(false)
      }
    }

    if (dropId) {
      fetchDrop()
    }
  }, [dropId])

  return { data, loading, error }
}

export const useBrandInfo = (): UseDataResult<BrandInfo | null> => {
  const [data, setData] = useState<BrandInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchBrandInfo = async () => {
      try {
        setLoading(true)
        const brandInfo = await contentfulService.getBrandInfo()
        setData(brandInfo)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        setLoading(false)
      }
    }

    fetchBrandInfo()
  }, [])

  return { data, loading, error }
}
