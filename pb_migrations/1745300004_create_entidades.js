/// <reference path="../pb_data/types.d.ts" />
// 4/9 — Catalogo de entidades del negocio

migrate((app) => {
  const collection = new Collection({
    id: "rune_entidade1",
    name: "entidades",
    type: "base",
    system: false,
    fields: [
      { id: "ent_nombre00001", name: "nombre",          type: "text",   required: true,  presentable: true,  system: false, hidden: false, min: null, max: null, pattern: "" },
      { id: "ent_lbl_plural1", name: "label_plural",    type: "text",   required: true,  presentable: false, system: false, hidden: false, min: null, max: null, pattern: "" },
      { id: "ent_lbl_singu1", name: "label_singular",  type: "text",   required: true,  presentable: false, system: false, hidden: false, min: null, max: null, pattern: "" },
      { id: "ent_icono00001", name: "icono",            type: "text",   required: false, presentable: false, system: false, hidden: false, min: null, max: null, pattern: "" },
      {
        id: "ent_vista00001",
        name: "vista_default",
        type: "select",
        required: false, system: false, hidden: false,
        values: ["table", "kanban", "calendar"],
        maxSelect: 1
      },
      { id: "ent_campo_tit1", name: "campo_titulo",    type: "text",   required: false, presentable: false, system: false, hidden: false, min: null, max: null, pattern: "" },
      { id: "ent_publico001", name: "publico",          type: "bool",   required: false, system: false, hidden: false },
      { id: "ent_activa0001", name: "activa",           type: "bool",   required: false, system: false, hidden: false },
      { id: "ent_orden00001", name: "orden",            type: "number", required: false, system: false, hidden: false, min: null, max: null, noDecimal: true }
    ],
    indexes: [
      "CREATE UNIQUE INDEX idx_entidades_nombre ON entidades (nombre)"
    ],
    listRule: "@request.auth.id != ''",
    viewRule: "@request.auth.id != ''",
    createRule: "@request.auth.id != ''",
    updateRule: "@request.auth.id != ''",
    deleteRule: "@request.auth.id != ''"
  })
  app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("rune_entidade1")
  app.delete(collection)
})
