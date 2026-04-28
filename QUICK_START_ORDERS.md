# Quick Start - Sistema de Pedidos GARNATA

## ⚡ Inicio Rápido en 3 Pasos

### 1️⃣ Configurar EmailJS (5 minutos)

```bash
# 1. Ir a https://www.emailjs.com
# 2. Registrarse con: glorialara72@gmail.com
# 3. Crear Email Service (conectar Gmail)
# 4. Crear Template Email con estas variables:
#    {{from_name}}, {{from_email}}, {{customer_phone}}
#    {{order_items}}, {{subtotal}}, {{iva}}, {{total}}, {{items_count}}
# 5. Copiar los 3 IDs:
```

Actualizar `src/services/emailService.ts`:
```typescript
const EMAILJS_SERVICE_ID = 'tu_service_id_aqui'
const EMAILJS_TEMPLATE_ID = 'tu_template_id_aqui'
const EMAILJS_PUBLIC_KEY = 'tu_public_key_aqui'
```

### 2️⃣ Instalar Dependencias

```bash
cd ~/Desktop/garnata
npm install
```

Ya está instalado: `emailjs-com` en package.json ✓

### 3️⃣ Ejecutar en Desarrollo

```bash
npm run dev
```

Abre: `http://localhost:5173`

---

## 🧪 Test Básico

1. **Ir al Catálogo** → Añadir 2 productos
2. **Ver Carrito** → Clic en icono carrito
3. **Finalizar Pedido** → Rellena:
   - Nombre: `Test`
   - Apellidos: `User`
   - Email: `test@gmail.com`
   - Teléfono: `+34 654123456`
4. **Proceder** → Verifica email en glorialara72@gmail.com

---

## 📋 Checklist de Configuración

- [ ] Cuenta EmailJS creada
- [ ] Email Service conectado
- [ ] Template Email creado
- [ ] IDs copiados en emailService.ts
- [ ] `npm install` ejecutado
- [ ] `npm run dev` funcionando
- [ ] Primer pedido enviado correctamente
- [ ] Email recibido en bandeja

---

## 🚀 Desplegar a Producción

```bash
npm run build
npm run preview
```

Archivos compilados en `dist/`

---

## 📞 Contacto & Soporte

**Documentación Completa:**
- `EMAILJS_SETUP.md` - Guía detallada de EmailJS
- `TESTING_GUIDE.md` - Casos de prueba completos
- `CHANGELOG_ORDERS.md` - Cambios implementados

**Problemas Comunes:**
1. "Error al enviar el pedido" → Verifica IDs en emailService.ts
2. Email no llega → Revisa Spam en Gmail
3. Validación de teléfono → Debe ser formato español (6XX XXX XXX)

---

## 🎯 Flujo Actual

```
Catálogo → Carrito → Formulario → Email → Confirmación → Home
```

¡Listo para usar! 🎉
