import { createClient } from 'contentful'

const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID
const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
const ENVIRONMENT = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master'

const client = SPACE_ID && ACCESS_TOKEN
  ? createClient({
      space: SPACE_ID,
      accessToken: ACCESS_TOKEN,
      environment: ENVIRONMENT,
    })
  : null

console.log('Contentful Client initialized:', {
  spaceId: SPACE_ID ? '✓' : '✗',
  token: ACCESS_TOKEN ? '✓' : '✗',
  environment: ENVIRONMENT,
})

// Helper para extraer texto simple de RichText
const extractRichTextContent = (richText: any): string => {
  if (!richText) return ''
  if (typeof richText === 'string') return richText

  try {
    // Si es un objeto RichText de Contentful, extraer el contenido
    if (richText.content && Array.isArray(richText.content)) {
      return richText.content
        .map((node: any) => {
          if (node.nodeType === 'text') return node.value
          if (node.nodeType === 'paragraph' && node.content) {
            return node.content.map((child: any) => child.value || '').join('')
          }
          return ''
        })
        .join(' ')
    }
  } catch (e) {
    console.warn('Error parsing RichText:', e)
  }

  return ''
}

export interface Product {
  id: string
  name: string
  slug?: string
  price: number
  description?: string
  pictures?: string[]
  status?: ('Disponible' | 'Ultimas unidades' | 'Agotado')[]
}

export interface Collection {
  id: string
  name: string
  description: string
  image?: string
}

export interface Drop {
  id: string
  name: string
  slug?: string
  date?: string
  description?: string
  pictures?: string[]
  products: Product[]
}

export interface BrandInfo {
  id: string
  name: string
  slogan?: string
  description?: string
  number?: number
  email?: string
  pictures?: string[]
}

export const contentfulService = {
  // Obtener todos los productos
  getProducts: async (): Promise<Product[]> => {
    try {
      if (!client) {
        console.warn('Contentful no configurado, usando datos mock')
        return []
      }

      const response = await client.getEntries({
        content_type: 'product',
      })

      return response.items.map((item: any) => {
        // Extraer URLs de imágenes de pictures
        let pictures: string[] = []
        if (item.fields.pictures && Array.isArray(item.fields.pictures)) {
          pictures = item.fields.pictures
            .map((pic: any) => pic.fields?.file?.url)
            .filter(Boolean)
        }

        return {
          id: item.sys.id,
          name: item.fields.name || '',
          slug: item.fields.slug,
          price: item.fields.price || 0,
          description: extractRichTextContent(item.fields.description),
          pictures,
          status: item.fields.status,
        }
      })
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

      const item = await client.getEntry(productId) as any

      // Extraer URLs de imágenes de pictures
      let pictures: string[] = []
      if (item.fields.pictures && Array.isArray(item.fields.pictures)) {
        pictures = item.fields.pictures
          .map((pic: any) => pic.fields?.file?.url)
          .filter(Boolean)
      }

      return {
        id: item.sys.id,
        name: item.fields.name || '',
        slug: item.fields.slug,
        price: item.fields.price || 0,
        description: extractRichTextContent(item.fields.description),
        pictures,
        status: item.fields.status,
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

  // Obtener Drops (Colecciones con 1-3 productos)
  getDrops: async (): Promise<Drop[]> => {
    try {
      if (!client) {
        console.warn('Contentful no configurado, usando datos mock')
        return []
      }

      const response = await client.getEntries({
        content_type: 'drop',
        order: '-fields.date' as any,
      })

      const drops: Drop[] = await Promise.all(
        response.items.map(async (item: any) => {
          // Si los productos están referenciados, obtenerlos
          let products: Product[] = []
          if (item.fields.products && Array.isArray(item.fields.products)) {
            products = await Promise.all(
              item.fields.products.map(async (productRef: any) => {
                const productId = productRef.sys?.id || productRef
                const productEntry = await client!.getEntry(productId)
                const p = productEntry as any

                // Extraer URLs de imágenes de pictures
                let productPictures: string[] = []
                if (p.fields.pictures && Array.isArray(p.fields.pictures)) {
                  productPictures = p.fields.pictures
                    .map((pic: any) => pic.fields?.file?.url)
                    .filter(Boolean)
                }

                return {
                  id: p.sys.id,
                  name: p.fields.name || '',
                  slug: p.fields.slug,
                  price: p.fields.price || 0,
                  description: extractRichTextContent(p.fields.description),
                  pictures: productPictures,
                  status: p.fields.status,
                }
              })
            )
          }

          // Extraer URLs de imágenes de pictures
          let pictures: string[] = []
          if (item.fields.pictures && Array.isArray(item.fields.pictures)) {
            pictures = item.fields.pictures
              .map((pic: any) => pic.fields?.file?.url)
              .filter(Boolean)
          }

          return {
            id: item.sys.id,
            name: item.fields.name || '',
            slug: item.fields.slug,
            date: item.fields.date,
            description: extractRichTextContent(item.fields.description),
            pictures,
            products,
          }
        })
      )

      return drops
    } catch (error) {
      console.error('Error fetching drops:', error)
      return []
    }
  },

  // Obtener Drop por ID
  getDropById: async (dropId: string): Promise<Drop | null> => {
    try {
      if (!client) {
        return null
      }

      const item = await client.getEntry(dropId) as any
      let products: Product[] = []

      if (item.fields.products && Array.isArray(item.fields.products)) {
        products = await Promise.all(
          item.fields.products.map(async (productRef: any) => {
            const productId = productRef.sys?.id || productRef
            const productEntry = await client!.getEntry(productId)
            const p = productEntry as any

            // Extraer URLs de imágenes de pictures
            let productPictures: string[] = []
            if (p.fields.pictures && Array.isArray(p.fields.pictures)) {
              productPictures = p.fields.pictures
                .map((pic: any) => pic.fields?.file?.url)
                .filter(Boolean)
            }

            return {
              id: p.sys.id,
              name: p.fields.name || '',
              slug: p.fields.slug,
              price: p.fields.price || 0,
              description: extractRichTextContent(p.fields.description),
              pictures: productPictures,
              status: p.fields.status,
            }
          })
        )
      }

      // Extraer URLs de imágenes de pictures
      let pictures: string[] = []
      if (item.fields.pictures && Array.isArray(item.fields.pictures)) {
        pictures = item.fields.pictures
          .map((pic: any) => pic.fields?.file?.url)
          .filter(Boolean)
      }

      return {
        id: item.sys.id,
        name: item.fields.name || '',
        slug: item.fields.slug,
        date: item.fields.date,
        description: extractRichTextContent(item.fields.description),
        pictures,
        products,
      }
    } catch (error) {
      console.error(`Error fetching drop ${dropId}:`, error)
      return null
    }
  },

  // Obtener información de la marca
  getBrandInfo: async (): Promise<BrandInfo | null> => {
    try {
      if (!client) {
        console.warn('Contentful no configurado')
        return null
      }

      const response = await client.getEntries({
        content_type: 'brandInfo',
        limit: 1,
      })

      if (!response.items.length) {
        return null
      }

      const item = response.items[0] as any

      // Extraer URLs de imágenes de pictures
      let pictures: string[] = []
      if (item.fields.pictures && Array.isArray(item.fields.pictures)) {
        pictures = item.fields.pictures
          .map((pic: any) => pic.fields?.file?.url)
          .filter(Boolean)
      }

      return {
        id: item.sys.id,
        name: item.fields.name || '',
        slogan: item.fields.slogan,
        description: extractRichTextContent(item.fields.description),
        number: item.fields.number,
        email: item.fields.email,
        pictures,
      }
    } catch (error) {
      console.error('Error fetching brand info:', error)
      return null
    }
  },
}
