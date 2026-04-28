import emailjs from 'emailjs-com'

// Configuración de EmailJS
const EMAILJS_SERVICE_ID = 'service_garnata'
const EMAILJS_TEMPLATE_ID = 'template_tezb5rb'
const EMAILJS_PUBLIC_KEY = 'GCjdqwVzDBBr77iSz'

// Inicializar EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY)

export interface OrderEmailData {
  to_email: string
  from_name: string
  from_email: string
  customer_phone: string
  order_items: string
  subtotal: string
  iva: string
  total: string
  items_count: number
}

export const sendOrderEmail = async (data: OrderEmailData): Promise<void> => {
  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_email: 'glorialara72@gmail.com',
        from_name: data.from_name,
        from_email: data.from_email,
        customer_phone: data.customer_phone,
        order_items: data.order_items,
        subtotal: data.subtotal,
        iva: data.iva,
        total: data.total,
        items_count: data.items_count,
      }
    )

    if (response.status !== 200) {
      throw new Error(`Error sending email: ${response.status}`)
    }

    return Promise.resolve()
  } catch (error) {
    console.error('Email service error:', error)
    throw error
  }
}
