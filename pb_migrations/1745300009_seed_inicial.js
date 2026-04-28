/// <reference path="../pb_data/types.d.ts" />
// 9/9 — Seed: roles, config, entidad pedidos (demo), campos, estados, nav_items

migrate((app) => {

  // ── 1. Roles ─────────────────────────────────────────────
  const rolesData = [
    { nombre: "admin",        descripcion: "Dueno del negocio, acceso total",        es_admin: true,  permisos: [] },
    { nombre: "empleado",     descripcion: "Ver y capturar registros",                es_admin: false, permisos: ["dashboard_access","pedidos_ver","pedidos_crear","pedidos_editar","clientes_ver","clientes_crear"] },
    { nombre: "cajero",       descripcion: "Solo ver y mover estado de pedidos",      es_admin: false, permisos: ["dashboard_access","pedidos_ver","pedidos_editar"] },
    { nombre: "solo_lectura", descripcion: "Solo consulta sin modificar",             es_admin: false, permisos: ["dashboard_access","pedidos_ver","clientes_ver"] },
  ]
  const rolesCol = app.findCollectionByNameOrId("roles")
  for (const d of rolesData) {
    const r = new Record(rolesCol)
    r.set("nombre",      d.nombre)
    r.set("descripcion", d.descripcion)
    r.set("es_admin",    d.es_admin)
    r.set("permisos",    d.permisos)
    app.save(r)
  }

  // ── 2. Config ────────────────────────────────────────────
  const configData = [
    { clave: "negocio_nombre", valor: "Mi Negocio", grupo: "negocio",    descripcion: "Nombre del negocio" },
    { clave: "negocio_slogan", valor: "",           grupo: "negocio",    descripcion: "Slogan o subtitulo" },
    { clave: "whatsapp",       valor: "",           grupo: "negocio",    descripcion: "Numero WhatsApp sin +52" },
    { clave: "moneda_simbolo", valor: "$",          grupo: "negocio",    descripcion: "Simbolo de moneda" },
    { clave: "tema",           valor: "light",      grupo: "apariencia", descripcion: "Tema DaisyUI activo" },
    { clave: "color_primario", valor: "#570df8",    grupo: "apariencia", descripcion: "Color primario HEX" },
  ]
  const configCol = app.findCollectionByNameOrId("config")
  for (const d of configData) {
    const r = new Record(configCol)
    r.set("clave",       d.clave)
    r.set("valor",       d.valor)
    r.set("grupo",       d.grupo)
    r.set("descripcion", d.descripcion)
    app.save(r)
  }

  // ── 3. Entidad: pedidos ──────────────────────────────────
  const entCol = app.findCollectionByNameOrId("entidades")
  const pedidosEnt = new Record(entCol)
  pedidosEnt.set("nombre",          "pedidos")
  pedidosEnt.set("label_plural",    "Pedidos")
  pedidosEnt.set("label_singular",  "Pedido")
  pedidosEnt.set("icono",           "shopping-bag")
  pedidosEnt.set("vista_default",   "kanban")
  pedidosEnt.set("campo_titulo",    "nombre_cliente")
  pedidosEnt.set("publico",         true)
  pedidosEnt.set("activa",          true)
  pedidosEnt.set("orden",           1)
  app.save(pedidosEnt)

  // ── 4. Campos de pedidos ─────────────────────────────────
  const camposData = [
    { nombre: "nombre_cliente", label: "Cliente",          pb_tipo: "text",   comp: "input_text",     ancho: "mitad",    orden: 1, req: true,  lista: true,  form: true,  bus: true,  grupo: "Datos del cliente",  icono: "" },
    { nombre: "telefono",       label: "Telefono",          pb_tipo: "text",   comp: "input_tel",      ancho: "mitad",    orden: 2, req: false, lista: false, form: true,  bus: false, grupo: "Datos del cliente",  icono: "phone" },
    { nombre: "descripcion",    label: "Descripcion",       pb_tipo: "text",   comp: "textarea",       ancho: "completo", orden: 3, req: true,  lista: false, form: true,  bus: false, grupo: "Detalle del pedido", icono: "" },
    { nombre: "fecha_entrega",  label: "Fecha de entrega",  pb_tipo: "date",   comp: "input_date",     ancho: "mitad",    orden: 4, req: true,  lista: true,  form: true,  bus: false, grupo: "Detalle del pedido", icono: "calendar" },
    { nombre: "anticipo",       label: "Anticipo $",        pb_tipo: "number", comp: "input_currency", ancho: "mitad",    orden: 5, req: false, lista: true,  form: true,  bus: false, grupo: "Detalle del pedido", icono: "currency-dollar" },
    { nombre: "total",          label: "Total $",           pb_tipo: "number", comp: "input_currency", ancho: "mitad",    orden: 6, req: false, lista: true,  form: true,  bus: false, grupo: "Detalle del pedido", icono: "currency-dollar" },
    { nombre: "estado",         label: "Estado",            pb_tipo: "select", comp: "select",         ancho: "mitad",    orden: 7, req: true,  lista: true,  form: true,  bus: false, grupo: "Detalle del pedido", icono: "", es_estado: true },
    { nombre: "notas",          label: "Notas internas",    pb_tipo: "text",   comp: "textarea",       ancho: "completo", orden: 8, req: false, lista: false, form: true,  bus: false, grupo: "Detalle del pedido", icono: "" },
  ]
  const camposCol = app.findCollectionByNameOrId("campos")
  for (const d of camposData) {
    const r = new Record(camposCol)
    r.set("entidad",            "pedidos")
    r.set("nombre",             d.nombre)
    r.set("label",              d.label)
    r.set("pb_tipo",            d.pb_tipo)
    r.set("daisyui_componente", d.comp)
    r.set("ancho_form",         d.ancho)
    r.set("orden",              d.orden)
    r.set("requerido",          d.req)
    r.set("visible_lista",      d.lista)
    r.set("visible_form",       d.form)
    r.set("buscable",           d.bus)
    r.set("grupo_form",         d.grupo)
    if (d.icono)    r.set("icono",           d.icono)
    if (d.es_estado) r.set("es_campo_estado", true)
    app.save(r)
  }

  // ── 5. Estados de pedidos ────────────────────────────────
  const estadosData = [
    { nombre: "nuevo",      label: "Nuevo",      color: "#6b7280", icono: "✨", inicial: true,  final: false, editar: true,  orden: 1 },
    { nombre: "en_proceso", label: "En proceso", color: "#f59e0b", icono: "🔧", inicial: false, final: false, editar: true,  orden: 2 },
    { nombre: "listo",      label: "Listo",      color: "#10b981", icono: "✅", inicial: false, final: false, editar: true,  orden: 3 },
    { nombre: "entregado",  label: "Entregado",  color: "#3b82f6", icono: "📦", inicial: false, final: true,  editar: false, orden: 4 },
    { nombre: "cancelado",  label: "Cancelado",  color: "#ef4444", icono: "❌", inicial: false, final: true,  editar: false, orden: 5 },
  ]
  const estadosCol = app.findCollectionByNameOrId("estados")
  for (const d of estadosData) {
    const r = new Record(estadosCol)
    r.set("entidad",        "pedidos")
    r.set("nombre",         d.nombre)
    r.set("label",          d.label)
    r.set("color",          d.color)
    r.set("icono",          d.icono)
    r.set("es_inicial",     d.inicial)
    r.set("es_final",       d.final)
    r.set("permite_editar", d.editar)
    r.set("orden",          d.orden)
    app.save(r)
  }

  // ── 6. Nav items ─────────────────────────────────────────
  const navData = [
    { label: "Dashboard", ruta: "/dashboard", icono: "home",         orden: 1, perm: "dashboard_access", entidad: "" },
    { label: "Pedidos",   ruta: "/e/pedidos", icono: "shopping-bag", orden: 2, perm: "pedidos_ver",       entidad: "pedidos" },
  ]
  const navCol = app.findCollectionByNameOrId("nav_items")
  for (const d of navData) {
    const r = new Record(navCol)
    r.set("label",              d.label)
    r.set("ruta",               d.ruta)
    r.set("icono",              d.icono)
    r.set("orden",              d.orden)
    r.set("activo",             true)
    r.set("requiredPermission", d.perm)
    r.set("entidad_nombre",     d.entidad)
    app.save(r)
  }

}, (app) => {
  const names = ["nav_items","estados","campos","entidades","config","roles"]
  for (const name of names) {
    try {
      const records = app.findAllRecords(name)
      for (const r of records) app.delete(r)
    } catch(e) {}
  }
})
