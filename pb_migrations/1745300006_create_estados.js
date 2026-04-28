/// <reference path="../pb_data/types.d.ts" />
// 6/9 — Estados por entidad → Kanban + Select

migrate((app) => {
  const collection = new Collection({
    id: "rune_estados001",
    name: "estados",
    type: "base",
    system: false,
    fields: [
      { id: "est_entidad001", name: "entidad",        type: "text",   required: true,  presentable: false, system: false, hidden: false, min: null, max: null, pattern: "" },
      { id: "est_nombre0001", name: "nombre",         type: "text",   required: true,  presentable: false, system: false, hidden: false, min: null, max: null, pattern: "" },
      { id: "est_label00001", name: "label",          type: "text",   required: true,  presentable: true,  system: false, hidden: false, min: null, max: null, pattern: "" },
      { id: "est_color00001", name: "color",          type: "text",   required: false, presentable: false, system: false, hidden: false, min: null, max: null, pattern: "" },
      { id: "est_icono00001", name: "icono",          type: "text",   required: false, presentable: false, system: false, hidden: false, min: null, max: null, pattern: "" },
      { id: "est_inicial001", name: "es_inicial",     type: "bool",   required: false, system: false, hidden: false },
      { id: "est_final00001", name: "es_final",       type: "bool",   required: false, system: false, hidden: false },
      { id: "est_perm_edit1", name: "permite_editar", type: "bool",   required: false, system: false, hidden: false },
      { id: "est_orden00001", name: "orden",          type: "number", required: false, system: false, hidden: false, min: null, max: null, noDecimal: true }
    ],
    indexes: [
      "CREATE UNIQUE INDEX idx_estados_unique ON estados (entidad, nombre)"
    ],
    listRule: "@request.auth.id != ''",
    viewRule: "@request.auth.id != ''",
    createRule: "@request.auth.id != ''",
    updateRule: "@request.auth.id != ''",
    deleteRule: "@request.auth.id != ''"
  })
  app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("rune_estados001")
  app.delete(collection)
})
