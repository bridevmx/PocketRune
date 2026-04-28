# PocketRune — Tareas del Proyecto

> Stack: Svelte 5 (Runes) + PocketBase + DaisyUI v5 + Tailwind v4 + tinro
> Arquitectura: instancia PocketBase por negocio, frontend compartido

---

## FASE 1 — Base de datos ✅

### Migraciones PocketBase
- [x] `1745300001_create_roles.js` — Roles con permisos JSON
- [x] `1745300002_update_users.js` — Users: agrega username, phone, avatar, role
- [x] `1745300003_create_config.js` — Config clave-valor del negocio
- [x] `1745300004_create_entidades.js` — Catálogo de colecciones del negocio
- [x] `1745300005_create_campos.js` — Campos por entidad → FormField renderer
- [x] `1745300006_create_estados.js` — Estados → Kanban + Select
- [x] `1745300007_create_nav_items.js` — Menú lateral dinámico
- [x] `1745300008_create_notificaciones.js` — Notificaciones internas
- [x] `1745300009_seed_inicial.js` — Seed: roles, config, entidad pedidos demo

### Validación
- [ ] Correr `pocketbase.exe serve` sin errores
- [ ] Verificar las 8 colecciones en `http://localhost:8090/_/`
- [ ] Verificar seed: 4 roles, 6 config, entidad pedidos con 8 campos y 5 estados
- [ ] Crear superuser admin (Brian) desde el panel `/_/`

---

## FASE 2 — Stores y conexión PocketBase

### `src/lib/pocketbase.js`
- [ ] Verificar que la URL apunte a `localhost:8090` en dev
- [ ] Agregar variable de entorno `PUBLIC_PB_URL` en `.env`

### `src/lib/stores/auth.store.svelte.js`
- [ ] Cambiar `menu_items` → `nav_items` (la colección ahora se llama así)
- [ ] En `hasPermissions()`: si `role.es_admin === true` → retornar `true` sin verificar array
- [ ] Verificar que `initAuth()` llame a `/api/me` correctamente con el expand de role

### `src/lib/stores/config.store.svelte.js` — NUEVO
- [ ] Crear store que lea la colección `config` de PocketBase
- [ ] Exponer: `negocio_nombre`, `tema`, `whatsapp`, `moneda_simbolo`
- [ ] Aplicar `tema` al `document.documentElement` (data-theme)
- [ ] Reemplazar el valor hardcodeado de tema en `App.svelte` con este store

### `src/lib/stores/entidades.store.svelte.js` — NUEVO
- [ ] Crear store que lea colección `entidades` (solo las activas, ordenadas por `orden`)
- [ ] Cache local para no re-fetch en cada navegación
- [ ] Exponer función `getEntidad(nombre)` para buscar por nombre

---

## FASE 3 — Componentes genéricos (src/lib/components/rune/)

### `FormField.svelte` — NUEVO
Renderiza un campo según su `daisyui_componente`
- [ ] Recibe props: `campo` (objeto de la colección `campos`), `value`, `onchange`
- [ ] Casos a implementar:
  - [ ] `input_text` → `<input type="text" class="input">`
  - [ ] `input_tel` → `<input type="tel">` + icono
  - [ ] `input_email` → `<input type="email">`
  - [ ] `input_number` → `<input type="number">`
  - [ ] `input_currency` → `<input type="number">` con prefijo de moneda
  - [ ] `input_date` → `<input type="date">`
  - [ ] `input_datetime` → `<input type="datetime-local">`
  - [ ] `textarea` → `<textarea class="textarea">`
  - [ ] `select` → `<select class="select">` (opciones desde `estados` si `es_campo_estado`)
  - [ ] `toggle` → `<input type="checkbox" class="toggle">`
  - [ ] `checkbox_group` → múltiples checkboxes
  - [ ] `radio_group` → múltiples radios
  - [ ] `star_rating` → estrellas clicables
  - [ ] `badge_estado` → badge DaisyUI con color del estado
  - [ ] `whatsapp_link` → enlace a wa.me con el número
  - [ ] `relation_select` → select que carga registros de otra colección
- [ ] Soporte para `ancho_form`: completo=`col-span-2`, mitad=`col-span-1`, tercio=`col-span-1 lg:col-span-1`
- [ ] Soporte para `daisyui_size`: xs/sm/md/lg → clase CSS correspondiente
- [ ] Mostrar `icono` (iconify-icon) a la izquierda del input si está definido
- [ ] Mostrar `placeholder` si está definido
- [ ] Marcar como `required` si `campo.requerido === true`

### `GenericForm.svelte` — NUEVO
Formulario completo de una entidad, construido desde `campos`
- [ ] Recibe props: `entidad` (string nombre), `record` (objeto para edición, null para crear)
- [ ] Cargar campos desde PocketBase: `campos` donde `entidad = props.entidad` y `visible_form = true`, ordenados por `orden`
- [ ] Agrupar campos por `grupo_form` → mostrar como secciones con título
- [ ] Grid de 2 columnas en desktop, 1 columna en móvil
- [ ] Renderizar cada campo con `<FormField>`
- [ ] Validar campos con `requerido = true` antes de submit
- [ ] Al submit: `pb.collection(entidad).create(data)` o `.update(id, data)`
- [ ] Toast de éxito con svelte-sonner al guardar
- [ ] Toast de error con mensaje de PocketBase si falla
- [ ] Botón cancelar → navegar hacia atrás con tinro
- [ ] Estado de loading en el botón submit

### `GenericTable.svelte` — NUEVO
Tabla de registros de una entidad
- [ ] Recibe props: `entidad` (string nombre)
- [ ] Cargar columnas desde `campos` donde `visible_lista = true`
- [ ] Cargar registros desde `pb.collection(entidad).getList(page, perPage)`
- [ ] Columna de acciones: Ver, Editar, Eliminar
- [ ] Paginación con DaisyUI
- [ ] Campo de búsqueda si hay campos con `buscable = true`
- [ ] Skeleton loading mientras carga
- [ ] Confirmar antes de eliminar (modal DaisyUI)
- [ ] Ordenar por columna al hacer click en el header

### `GenericKanban.svelte` — NUEVO
Vista kanban de una entidad con estados
- [ ] Recibe props: `entidad` (string nombre)
- [ ] Cargar estados desde `estados` donde `entidad = props.entidad`, ordenados por `orden`
- [ ] Cargar registros y agrupar por el campo con `es_campo_estado = true`
- [ ] Cada columna = un estado con su color e icono
- [ ] Tarjeta muestra: campo `campo_titulo` de la entidad + fecha + monto si existe
- [ ] Click en tarjeta → navegar a detalle del registro
- [ ] Drag & drop para mover entre columnas (actualiza el campo estado en PocketBase)
- [ ] Contador de registros por columna
- [ ] Solo mostrar columnas de estados donde `es_final = false` por default (toggle para ver finales)

---

## FASE 4 — Rutas dinámicas (src/lib/routes/entidad/)

### `EntidadList.svelte` — NUEVO
- [ ] Recibe `params.entidad` desde tinro
- [ ] Cargar entidad desde store: `entidades.getEntidad(params.entidad)`
- [ ] Si `vista_default === 'kanban'` → mostrar `<GenericKanban>`
- [ ] Si `vista_default === 'table'` → mostrar `<GenericTable>`
- [ ] Botón "+ Nuevo" → navegar a `/e/{entidad}/new`
- [ ] Título de página = `entidad.label_plural`

### `EntidadNew.svelte` — NUEVO
- [ ] Recibe `params.entidad` desde tinro
- [ ] Mostrar `<GenericForm entidad={params.entidad} record={null} />`
- [ ] Título: `Nuevo {entidad.label_singular}`
- [ ] Al guardar → redirigir a `/e/{entidad}`

### `EntidadDetail.svelte` — NUEVO
- [ ] Recibe `params.entidad` y `params.id` desde tinro
- [ ] Cargar registro completo con expand
- [ ] Mostrar `<GenericForm>` en modo edición
- [ ] Mostrar historial de cambios (campo `updated`)
- [ ] Botón eliminar con confirmación

---

## FASE 5 — Rutas públicas (formulario del cliente)

### `PublicFormIndex.svelte` — NUEVO
Formulario público accesible sin login (para que el cliente capture su pedido)
- [ ] Ruta: `/p/:entidad`
- [ ] NO requiere autenticación
- [ ] Usa `<PublicLayout>` existente
- [ ] Cargar campos donde `visible_form = true`
- [ ] Mostrar nombre y logo del negocio desde `config`
- [ ] Al enviar: `pb.collection(entidad).create(data)` con el estado inicial
- [ ] Pantalla de confirmación post-envío con mensaje y botón WhatsApp
- [ ] Diseño mobile-first (el cliente lo abre desde su celular)

---

## FASE 6 — App.svelte (agregar rutas nuevas)

- [ ] Agregar ruta `/e/:entidad` → `EntidadList` con Guard `["dashboard_access"]`
- [ ] Agregar ruta `/e/:entidad/new` → `EntidadNew` con Guard `["dashboard_access"]`
- [ ] Agregar ruta `/e/:entidad/:id` → `EntidadDetail` con Guard `["dashboard_access"]`
- [ ] Agregar ruta `/p/:entidad` → `PublicFormIndex` SIN Guard (pública)
- [ ] Verificar que `LayoutDecider` detecte correctamente rutas `/p/` como públicas

---

## FASE 7 — Sidebar y Topbar dinámicos

### `Sidebar.svelte`
- [ ] Leer `auth.navItems` (ya viene del store filtrado por permisos)
- [ ] Cambiar la colección que lee: `menu_items` → `nav_items`
- [ ] Verificar que `requiredPermission` funcione con el filtro del store
- [ ] Marcar item activo según ruta actual (tinro `$router.path`)

### `Topbar.svelte`
- [ ] Agregar badge de notificaciones no leídas
- [ ] Leer `notificaciones` donde `leida = false` y `user = auth.user.id`
- [ ] Click en campana → dropdown con últimas 5 notificaciones
- [ ] Click en notificación → marcar como leída + navegar al registro
- [ ] Mostrar nombre del negocio desde `config.negocio_nombre`

---

## FASE 8 — Panel de configuración del negocio

### `ConfigPage.svelte` — NUEVO
Ruta: `/config` (solo admin)
- [ ] Formulario para editar registros de la colección `config`
- [ ] Sección "Negocio": nombre, slogan, whatsapp, moneda
- [ ] Sección "Apariencia": selector de tema DaisyUI (preview en vivo), color primario
- [ ] Guardar con `pb.collection('config').update(id, { valor })`
- [ ] Los cambios se reflejan inmediatamente en el themeStore

### `RolesPage.svelte` — NUEVO
Ruta: `/config/roles` (solo admin)
- [ ] Listar roles existentes
- [ ] Crear/editar rol: nombre, descripcion, permisos (checkboxes)
- [ ] Los permisos disponibles se generan automáticamente de las entidades activas
  - Formato: `{entidad_nombre}_{accion}` donde acciones = ver, crear, editar, eliminar, exportar
- [ ] Asignar rol a usuario existente

### `UsuariosPage.svelte` — NUEVO
Ruta: `/config/usuarios` (solo admin)
- [ ] Listar usuarios registrados
- [ ] Ver/editar rol de cada usuario
- [ ] Activar/desactivar usuario
- [ ] Copiar link de invitación al registro

---

## FASE 9 — Despliegue multi-instancia

### Script de nueva instancia
- [ ] Crear `scripts/nueva_instancia.sh`
  - Recibe: nombre del negocio, puerto
  - Crea carpeta `/negocios/{nombre}/`
  - Copia el ejecutable pocketbase
  - Copia las migraciones
  - Crea archivo `.env` con el puerto
  - Registra en PM2
- [ ] Probar script con instancia `pasteleria_luna` en puerto 8091

### Configuración PM2
- [ ] Instalar PM2: `npm install -g pm2`
- [ ] Crear `ecosystem.config.js` con cada instancia
- [ ] `pm2 startup` para arrancar automático al reiniciar servidor
- [ ] `pm2 save` para guardar la configuración

### Nginx (proxy reverso)
- [ ] Instalar Nginx en el servidor
- [ ] Configurar subdominio por negocio:
  - `miapi.tudominio.com` → `localhost:8090`
  - `pasteleria.tudominio.com` → `localhost:8091`
- [ ] Configurar SSL con Certbot (Let's Encrypt)
- [ ] Configurar el frontend (Vite build) como sitio estático en Nginx

---

## FASE 10 — Polish y extras

- [ ] Loading global: skeleton en GenericTable y GenericKanban
- [ ] Error boundaries: página de error 404 y 403 ya existen, verificar
- [ ] Responsive: verificar Sidebar colapsable en móvil
- [ ] Dark mode: verificar que el toggle de tema funcione con los nuevos componentes
- [ ] Exportar tabla a CSV desde GenericTable
- [ ] Filtros avanzados en GenericTable (por fecha, por estado)
- [ ] Modo offline básico: guardar último fetch en localStorage
- [ ] PWA: agregar `manifest.json` y service worker básico para instalar en móvil

---

## Notas técnicas importantes

### Convención de permisos
```
{entidad_nombre}_{accion}
Ejemplos: pedidos_ver, pedidos_crear, clientes_editar
Especiales: dashboard_access (requerido para entrar al dashboard)
```

### Campos que PocketBase crea automáticamente en `users`
Estos YA EXISTEN, no agregar en migraciones:
`id, email, emailVisibility, verified, password, tokenKey, name, created, updated`

### Regla para colecciones auth en migraciones
```js
// users y superusers → MODIFICAR con findCollectionByNameOrId()
// Cualquier otra colección auth propia → new Collection({ type: 'auth' })
```

### Estructura de carpetas nueva (solo agregar, no modificar lo existente)
```
src/lib/
├── components/
│   ├── rune/              ← NUEVO
│   │   ├── FormField.svelte
│   │   ├── GenericForm.svelte
│   │   ├── GenericTable.svelte
│   │   └── GenericKanban.svelte
│   └── ui/                ← NO TOCAR
├── routes/
│   ├── entidad/           ← NUEVO
│   │   ├── EntidadList.svelte
│   │   ├── EntidadNew.svelte
│   │   └── EntidadDetail.svelte
│   └── public/            ← NUEVO
│       └── PublicFormIndex.svelte
└── stores/
    ├── config.store.svelte.js   ← NUEVO
    └── entidades.store.svelte.js ← NUEVO
```

---

## Progreso actual

| Fase | Estado |
|------|--------|
| 1 - Migraciones | ✅ Completo |
| 2 - Stores | 🔲 Pendiente |
| 3 - Componentes genéricos | 🔲 Pendiente |
| 4 - Rutas dinámicas | 🔲 Pendiente |
| 5 - Rutas públicas | 🔲 Pendiente |
| 6 - App.svelte rutas | 🔲 Pendiente |
| 7 - Sidebar/Topbar dinámicos | 🔲 Pendiente |
| 8 - Panel de configuración | 🔲 Pendiente |
| 9 - Despliegue multi-instancia | 🔲 Pendiente |
| 10 - Polish | 🔲 Pendiente |
