import { loadStripe, Stripe } from '@stripe/stripe-js'

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY as string

let stripePromise: Promise<Stripe | null> | null = null

interface CheckoutItem {
  name: string
  price: number
  quantity: number
  image?: string
}

interface CheckoutSession {
  id: string
}

interface MockCheckoutResult {
  success: boolean
  orderId: string
  message: string
}

export const getStripe = async (): Promise<Stripe | null> => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLIC_KEY)
  }
  return stripePromise
}

export const stripeService = {
  // Crear sesión de checkout
  createCheckoutSession: async (items: CheckoutItem[]): Promise<CheckoutSession> => {
    try {
      const response = await fetch('/api/checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      return await response.json()
    } catch (error) {
      console.error('Error creating checkout session:', error)
      throw error
    }
  },

  // Redirigir a Stripe Checkout
  redirectToCheckout: async (items: CheckoutItem[]): Promise<void> => {
    try {
      const stripe = await getStripe()
      if (!stripe) {
        throw new Error('Stripe failed to load')
      }

      const sessionId = await stripeService.createCheckoutSession(items)

      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId.id,
      })

      if (error) {
        console.error('Redirect error:', error)
      }
    } catch (error) {
      console.error('Error in redirectToCheckout:', error)
    }
  },

  // Mock checkout para desarrollo
  mockCheckout: async (items: CheckoutItem[]): Promise<MockCheckoutResult> => {
    console.log('🎉 Mock Checkout iniciado')
    console.log('Productos:', items)
    console.log('Total:', items.reduce((sum, item) => sum + (item.price * item.quantity), 0))

    return {
      success: true,
      orderId: `GARNATA-${Date.now()}`,
      message: 'Orden creada exitosamente (modo demo)',
    }
  },
}
