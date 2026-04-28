# Configuración de EmailJS para GARNATA

## Descripción General

Este documento explica cómo configurar EmailJS para que el sistema de pedidos de GARNATA funcione correctamente. Los pedidos se envían por correo electrónico a `glorialara72@gmail.com` con toda la información del cliente y los artículos.

## Pasos de Configuración

### 1. Crear una Cuenta en EmailJS

1. Ve a [emailjs.com](https://www.emailjs.com)
2. Haz clic en **Sign Up**
3. Completa el formulario con tu email (glorialara72@gmail.com)
4. Verifica tu email

### 2. Crear un Email Service

1. En el dashboard, ve a **Email Services**
2. Haz clic en **Add Service**
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
4. Sigue las instrucciones para conectar tu cuenta
5. Copia el **Service ID** (ej: `service_xxxxx`)

**Guardarlo como**: `EMAILJS_SERVICE_ID` en `src/services/emailService.ts`

### 3. Crear un Email Template

1. Ve a **Email Templates**
2. Haz clic en **Create New Template**
3. Nombre: `Order Template` (o similar)
4. Configura el template con las siguientes variables:

```html
<h2>Nuevo Pedido de {{from_name}}</h2>

<p><strong>Información del Cliente:</strong></p>
<ul>
  <li>Nombre: {{from_name}}</li>
  <li>Email: {{from_email}}</li>
  <li>Teléfono: {{customer_phone}}</li>
</ul>

<p><strong>Artículos del Pedido:</strong></p>
<pre>{{order_items}}</pre>

<p><strong>Resumen Económico:</strong></p>
<ul>
  <li>Subtotal: €{{subtotal}}</li>
  <li>IVA (21%): €{{iva}}</li>
  <li>Total: €{{total}}</li>
  <li>Cantidad de artículos: {{items_count}}</li>
</ul>

<p>
  Por favor, ponte en contacto con el cliente para confirmar los detalles del pedido y 
  proceder con el pago.
</p>
```

5. Copia el **Template ID** (ej: `template_xxxxx`)

**Guardarlo como**: `EMAILJS_TEMPLATE_ID` en `src/services/emailService.ts`

### 4. Obtener la Clave Pública

1. Ve a **Account**
2. En **API Keys**, copia la **Public Key**
3. Esta es tu `EMAILJS_PUBLIC_KEY`

**Guardarlo como**: `EMAILJS_PUBLIC_KEY` en `src/services/emailService.ts`

### 5. Actualizar el Código

En `src/services/emailService.ts`, reemplaza:

```typescript
const EMAILJS_SERVICE_ID = 'service_garnata'
const EMAILJS_TEMPLATE_ID = 'template_order'
const EMAILJS_PUBLIC_KEY = 'user_HvZVK0o3Q6xK4mQ3fJ9qM'
```

Con tus valores reales de EmailJS.

## Prueba del Sistema

### En Desarrollo

1. Inicia el servidor: `npm run dev`
2. Navega al carrito
3. Añade un producto al carrito
4. Haz clic en **Finalizar Pedido**
5. Completa el formulario
6. Haz clic en **Proceder al Pedido**

### Validación del Formulario

El formulario valida automáticamente:
- **Nombre**: No puede estar vacío
- **Apellidos**: No puede estar vacío
- **Email**: Debe tener formato válido (ej: user@domain.com)
- **Teléfono**: Debe ser un número español válido (6xx, 7xx, 8xx, 9xx)

### Mensajes de Éxito

Si todo está configurado correctamente, verás:
1. Mensaje "Enviando..." durante el envío
2. Pantalla de confirmación elegante
3. El carrito se limpia automáticamente
4. Redirección al inicio en 5 segundos

## Solución de Problemas

### Error: "EmailJS not initialized"

**Causa**: La clave pública es incorrecta
**Solución**: Verifica tu `EMAILJS_PUBLIC_KEY` en `src/services/emailService.ts`

### Error: "Service not found"

**Causa**: El `EMAILJS_SERVICE_ID` es incorrecto
**Solución**: Verifica que el ID coincida con el que configuraste en EmailJS

### Error: "Template not found"

**Causa**: El `EMAILJS_TEMPLATE_ID` es incorrecto
**Solución**: Verifica que el ID coincida con el template que creaste

### El email no se envía

**Pasos de diagnóstico**:
1. Abre la consola del navegador (F12)
2. Intenta enviar un pedido
3. Busca errores en la consola
4. Verifica en el dashboard de EmailJS si hay logs de error

## Variables del Template

Cada variable que uses en el template debe coincidir con las que se envían desde el código:

| Variable | Descripción | Ejemplo |
|----------|------------|---------|
| `to_email` | Email del destinatario | glorialara72@gmail.com |
| `from_name` | Nombre completo del cliente | Juan García López |
| `from_email` | Email del cliente | juan@example.com |
| `customer_phone` | Teléfono del cliente | +34 654 123 456 |
| `order_items` | Listado de artículos | Anillo Gold x2: €500 |
| `subtotal` | Subtotal sin IVA | 500.00 |
| `iva` | Cantidad de IVA | 105.00 |
| `total` | Total con IVA | 605.00 |
| `items_count` | Cantidad de artículos | 2 |

## Personalización del Template

Puedes personalizar el template HTML según tus necesidades:
- Añadir logo de GARNATA
- Incluir términos y condiciones
- Agregar información de envío
- Personalizar con CSS inline

**Ejemplo avanzado**:

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; }
    .header { background-color: #D4A017; padding: 20px; }
    .order-items { background-color: #F5EFE7; padding: 15px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>GARNATA - Nuevo Pedido</h1>
  </div>
  <div class="order-items">
    <h3>Cliente: {{from_name}}</h3>
    <p>{{order_items}}</p>
    <p><strong>Total: €{{total}}</strong></p>
  </div>
</body>
</html>
```

## Límites y Consideraciones

- **Plan Gratuito**: 200 emails/mes
- **Plan Pro**: Emails ilimitados
- **Rate Limit**: 10 requests/segundo

Para producción, considera actualizar a un plan de pago si esperas muchos pedidos.

## Recursos Adicionales

- [Documentación oficial de EmailJS](https://www.emailjs.com/docs/)
- [Tutorial completo](https://www.emailjs.com/docs/tutorial/creating-email-template/)
- [Variables dinámicas](https://www.emailjs.com/docs/tutorial/dynamic-variables/)
