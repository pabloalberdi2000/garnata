# Guía de Testing - Sistema de Pedidos GARNATA

## Preparación Inicial

1. Asegúrate de tener configurado EmailJS (ver `EMAILJS_SETUP.md`)
2. Inicia el servidor: `npm run dev`
3. Abre la aplicación en `http://localhost:5173`

## Flujo de Testeo Completo

### Paso 1: Navegar al Catálogo

1. Haz clic en **"Explorar Catálogo"** en la página de inicio
2. Deberías ver una grid de productos con joyas

### Paso 2: Añadir Productos al Carrito

1. Haz clic en **"Añadir al Carrito"** en cualquier producto
2. Verifica que el contador del carrito se actualiza en la navbar
3. Repite con 2-3 productos más

### Paso 3: Ir al Carrito

1. Haz clic en el icono del carrito en la navbar
2. Deberías ver:
   - Lista de productos con cantidades
   - Imágenes de productos
   - Precio unitario y total por artículo
   - Opción de cambiar cantidades (+ / -)
   - Botón "Eliminar" por cada artículo

### Paso 4: Verificar Resumen

En el panel derecho:
1. Subtotal correcto (suma de todos los productos)
2. Envío: "Gratis"
3. IVA (21%): calculado correctamente
4. Total: subtotal + IVA

### Paso 5: Abrir Formulario de Pedido

1. Haz clic en **"Finalizar Pedido"**
2. Debería aparecer un modal elegante con el formulario

### Paso 6: Llenar el Formulario - Casos de Éxito

#### Test 6.1: Formulario Válido

Rellena los campos:
- **Nombre**: Juan
- **Apellidos**: García López
- **Email**: juan@gmail.com
- **Teléfono**: +34 654123456

Verifica:
1. Los campos aceptan los valores
2. No hay mensajes de error
3. El botón "Proceder al Pedido" está habilitado

#### Test 6.2: Teléfono Alternativo

Prueba diferentes formatos de teléfono:
- `654123456` ✓ (válido)
- `+34654123456` ✓ (válido)
- `0034654123456` ✓ (válido)
- `+34 654 123 456` ✓ (válido con espacios)

### Paso 7: Validación de Campos - Casos de Error

#### Test 7.1: Nombre Vacío

1. Deja el campo "Nombre" vacío
2. Haz clic en "Proceder al Pedido"
3. Debería ver error: "El nombre es requerido"
4. El campo debe estar resaltado en rojo

#### Test 7.2: Email Inválido

1. Rellena Email con: `notanemail`
2. Haz clic en "Proceder al Pedido"
3. Error: "El email no es válido"
4. Campo resaltado en rojo

#### Test 7.3: Teléfono Inválido

Prueba valores inválidos:
- `123456789` (demasiado corto) → Error
- `7654123456` (número fijo español) → Error
- `invalid` (no es número) → Error

Error esperado: "El teléfono debe ser un número español válido"

#### Test 7.4: Todos los Campos Vacíos

1. Intenta enviar sin llenar nada
2. Todos los campos deben mostrar errores

### Paso 8: Envío del Pedido

1. Llena todos los campos correctamente:
   ```
   Nombre: María
   Apellidos: Rodríguez García
   Email: maria@example.com
   Teléfono: +34 661234567
   ```

2. Haz clic en **"Proceder al Pedido"**

3. Verifica:
   - El botón cambia a "Enviando..." (deshabilitado)
   - Aparece un spinner o indicador de carga
   - No puedes hacer clic en botones mientras se envía

### Paso 9: Confirmación de Éxito

Después de 2-3 segundos, debería aparecer:

**Pantalla de Éxito:**
- Icono verde con checkmark ✓
- Título: "¡Pedido Realizado!"
- Mensaje: "Gracias por elegir GARNATA..."
- 3 viñetas de información
- Botón "Volver al Inicio"
- Botón "Seguir Comprando"
- Mensaje: "Se cerrará automáticamente en 5 segundos..."

### Paso 10: Verificación Post-Pedido

1. El carrito debería estar **vacío**
2. Después de 5 segundos, deberías regresar al inicio
3. El contador del carrito debería ser 0

### Paso 11: Verificar Email Recibido

1. Abre `glorialara72@gmail.com`
2. Debería haber un email con:
   - Asunto: "Nuevo Pedido de [Nombre Cliente]"
   - Información del cliente (nombre, email, teléfono)
   - Listado de artículos con cantidades y precios
   - Subtotal, IVA y Total
   - Cantidad de artículos

## Casos de Error a Probar

### Error de EmailJS

Si los datos de EmailJS son incorrectos:

1. Rellena el formulario correctamente
2. Haz clic en "Proceder al Pedido"
3. El botón cambia a "Enviando..."
4. Aparece un alert: **"Error al enviar el pedido. Por favor, intenta de nuevo."**
5. El formulario se mantiene abierto para reintentar

### Comprobar Errores en Consola

Abre la consola del navegador (F12) y busca:
- ErrorEvent si hay problemas de EmailJS
- Logs de "Email service error:"

## Checklist de Testing

- [ ] Producto añadido al carrito correctamente
- [ ] Carrito muestra cantidad y total correcto
- [ ] Botón "Finalizar Pedido" abre el modal
- [ ] Formulario valida nombre (requerido)
- [ ] Formulario valida apellidos (requerido)
- [ ] Formulario valida email (formato)
- [ ] Formulario valida teléfono (formato español)
- [ ] Resumen del pedido muestra datos correctos
- [ ] Botón de envío se deshabilita mientras carga
- [ ] Pantalla de éxito aparece tras envío
- [ ] Carrito se limpia automáticamente
- [ ] Email llega a `glorialara72@gmail.com`
- [ ] Email contiene toda la información del cliente
- [ ] Email contiene detalles correctos de artículos
- [ ] Email contiene totales correctos
- [ ] Botón "Volver al Inicio" navega correctamente
- [ ] Botón "Seguir Comprando" navega al catálogo
- [ ] Modal se cierra automáticamente tras 5 segundos

## Testing en Diferentes Navegadores

Prueba en:
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## Testing en Mobile

Prueba en viewport móvil (375px):
- [ ] Formulario es responsive
- [ ] Modal es visible y usable
- [ ] Inputs son accesibles
- [ ] Texto no está truncado
- [ ] Botones son clickeables

## Notas de Debugging

### Verificar EmailJS en la Consola

```javascript
// En la consola del navegador
console.log(localStorage.getItem('garnata-cart'))
```

### Test Email Manual

Puedes probar EmailJS directamente:

```javascript
// En la consola
import emailjs from 'emailjs-com'
emailjs.init('tu_public_key')
emailjs.send('tu_service', 'tu_template', {
  to_email: 'test@example.com',
  from_name: 'Test User',
  from_email: 'user@example.com',
  customer_phone: '+34 654 123 456'
})
```

## Limpieza Post-Testing

1. Limpia el localStorage:
   ```javascript
   localStorage.removeItem('garnata-cart')
   ```

2. Vacía los datos de prueba del email

3. Reset de la aplicación:
   - Recarga la página (F5)
   - Limpia el caché del navegador
