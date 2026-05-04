import emailjs from 'emailjs-com'

// Configuración de EmailJS
const EMAILJS_SERVICE_ID = 'service_qiw8dge'
const EMAILJS_TEMPLATE_ID_JEWELRY = 'template_tezb5rb' // Plantilla para joyería
const EMAILJS_TEMPLATE_ID_CLIENT = 'template_waysvwb' // Plantilla para cliente
const EMAILJS_PUBLIC_KEY = 'GCjdqwVzDBBr77iSz'

// Inicializar EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY)

export interface OrderEmailData {
  to_email: string
  name: string
  email: string
  phone: string
  order_details: string
  cost_total: string
}

export const sendOrderEmail = async (data: OrderEmailData): Promise<void> => {
  const templateParams = {
    to_email: 'glorialara72@gmail.com',
    name: data.name,
    email: data.email,
    phone: data.phone,
    order_details: data.order_details,
    cost_total: data.cost_total,
  }

  let jewelrySent = false
  let clientSent = false

  try {
    // Llamada 1: Enviar a la joyería (glorialara72@gmail.com)
    console.log('📧 Enviando notificación a la joyería...', templateParams)
    const jewelryResponse = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID_JEWELRY,
      templateParams
    )

    console.log('Respuesta joyería:', jewelryResponse)
    if (jewelryResponse.status !== 200) {
      throw new Error(`Error enviando correo a joyería: ${jewelryResponse.status}`)
    }
    jewelrySent = true
    console.log('✓ Notificación a joyería enviada exitosamente')
  } catch (jewelryError) {
    console.error('❌ Error enviando a joyería:', jewelryError)
    throw new Error(`Fallo crítico: No se pudo notificar a la joyería. ${jewelryError instanceof Error ? jewelryError.message : ''}`)
  }

  try {
    // Llamada 2: Enviar confirmación al cliente
    console.log('📧 Enviando confirmación al cliente...', templateParams)
    const clientResponse = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID_CLIENT,
      templateParams
    )

    console.log('Respuesta cliente:', clientResponse)
    if (clientResponse.status !== 200) {
      throw new Error(`Error enviando correo al cliente: ${clientResponse.status}`)
    }
    clientSent = true
    console.log('✓ Confirmación al cliente enviada exitosamente')
  } catch (clientError) {
    console.error('⚠️ Error enviando confirmación al cliente:', clientError)
    // No lanzamos error aquí porque la joyería ya fue notificada (prioridad principal)
    console.log('⚠️ Advertencia: El cliente no recibió la confirmación, pero la joyería sí fue notificada')
  }

  if (!jewelrySent) {
    throw new Error('El pedido no se pudo procesar. La joyería no fue notificada.')
  }

  return Promise.resolve()
}
