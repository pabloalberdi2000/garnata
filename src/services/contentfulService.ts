import { createClient } from 'contentful'

const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID || 'demo'
const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN || 'demo'

const client = SPACE_ID !== 'demo' && ACCESS_TOKEN !== 'demo'
  ? createClient({
      space: SPACE_ID,
      accessToken: ACCESS_TOKEN,
    })
  : null

export interface Product {
  id: string
  name: string
  description: string
  price: number
  collection: string
  image?: string
  sku?: string
  details?: string
  materials?: string[]
}

export interface Collection {
  id: string
  name: string
  description: string
  image?: string
}

export interface StoreInfo {
  id: string
  name: string
  description: string
  email: string
  phone: string
  address: string
}

export const contentfulService = {
  // Obtener todos los productos
  getProducts: async (collection: string | null = null): Promise<Product[]> => {
    try {
      if (!client) {
        console.warn('Contentful no configurado, usando datos mock')
        return []
      }

      const query: Record<string, unknown> = {
        content_type: 'product',
      }

      if (collection) {
        query['fields.collection[in]'] = collection
      }

      const response = await client.getEntries(query)
      return response.items.map((item: any) => ({
        id: item.sys.id,
        name: item.fields.name,
        description: item.fields.description,
        price: item.fields.price,
        collection: item.fields.collection,
        image: item.fields.image?.fields?.file?.url,
        sku: item.fields.sku,
      }))
    } catch (error) {
      console.error('Error fetching products:', error)
      return []
    }
  },

  // Obtener producto por ID
  getProductById: async (productId: string): Promise<Product | null> => {
    try {
      if (!client) {
        return null
      }

      const response = await client.getEntry(productId)
      const item = response as any
      return {
        id: item.sys.id,
        name: item.fields.name,
        description: item.fields.description,
        price: item.fields.price,
        collection: item.fields.collection,
        image: item.fields.image?.fields?.file?.url,
        sku: item.fields.sku,
        details: item.fields.details,
        materials: item.fields.materials,
      }
    } catch (error) {
      console.error(`Error fetching product ${productId}:`, error)
      return null
    }
  },

  // Obtener colecciones disponibles
  getCollections: async (): Promise<Collection[]> => {
    try {
      if (!client) {
        return []
      }

      const response = await client.getEntries({
        content_type: 'collection',
      })
      return response.items.map((item: any) => ({
        id: item.sys.id,
        name: item.fields.name,
        description: item.fields.description,
        image: item.fields.image?.fields?.file?.url,
      }))
    } catch (error) {
      console.error('Error fetching collections:', error)
      return []
    }
  },

  // Obtener información de la tienda (configuración)
  getStoreInfo: async (): Promise<StoreInfo | null> => {
    try {
      if (!client) {
        return null
      }

      const response = await client.getEntries({
        content_type: 'storeInfo',
        limit: 1,
      })
      const item = response.items[0] as any
      return {
        id: item.sys.id,
        name: item.fields.storeName,
        description: item.fields.description,
        email: item.fields.email,
        phone: item.fields.phone,
        address: item.fields.address,
      }
    } catch (error) {
      console.error('Error fetching store info:', error)
      return null
    }
  },
}
