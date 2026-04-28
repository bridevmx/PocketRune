/// <reference path="../pb_data/types.d.ts" />
// 7/9 — Menu lateral dinamico desde DB

migrate((app) => {
  const collection = new Collection({
    id: "rune_nav_item1",
    name: "nav_items",
    type: "base",
    system: false,
    fields: [
      { id: "nav_label00001", name: "label",               type: "text",   required: true,  presentable: true,  system: false, hidden: false, min: null, max: null, pattern: "" },
      { id: "nav_ent_nomb1",  name: "entidad_nombre",      type: "text",   required: false, presentable: false, system: false, hidden: false, min: null, max: null, pattern: "" },
      { id: "nav_ruta000001", name: "ruta",                type: "text",   required: false, presentable: false, system: false, hidden: false, min: null, max: null, pattern: "" },
      { id: "nav_icono00001", name: "icono",               type: "text",   required: false, presentable: false, system: false, hidden: false, min: null, max: null, pattern: "" },
      { id: "nav_orden00001", name: "orden",               type: "number", required: false, system: false, hidden: false, min: null, max: null, noDecimal: true },
      { id: "nav_activo0001", name: "activo",              type: "bool",   required: false, system: false, hidden: false },
      { id: "nav_req_perm1",  name: "requiredPermission",  type: "text",   required: false, presentable: false, system: false, hidden: false, min: null, max: null, pattern: "" }
    ],
    indexes: [],
    listRule: "@request.auth.id != ''",
    viewRule: "@request.auth.id != ''",
    createRule: "@request.auth.id != ''",
    updateRule: "@request.auth.id != ''",
    deleteRule: "@request.auth.id != ''"
  })
  app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("rune_nav_item1")
  app.delete(collection)
})
