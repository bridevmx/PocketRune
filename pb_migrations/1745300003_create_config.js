/// <reference path="../pb_data/types.d.ts" />
// 3/9 — Config clave-valor del negocio

migrate((app) => {
  const collection = new Collection({
    id: "rune_config0001",
    name: "config",
    type: "base",
    system: false,
    fields: [
      {
        id: "cfg_clave000001",
        name: "clave",
        type: "text",
        required: true,
        presentable: true,
        system: false,
        hidden: false,
        min: null, max: null, pattern: ""
      },
      {
        id: "cfg_valor000001",
        name: "valor",
        type: "text",
        required: false,
        presentable: false,
        system: false,
        hidden: false,
        min: null, max: null, pattern: ""
      },
      {
        id: "cfg_grupo000001",
        name: "grupo",
        type: "text",
        required: false,
        presentable: false,
        system: false,
        hidden: false,
        min: null, max: null, pattern: ""
      },
      {
        id: "cfg_desc0000001",
        name: "descripcion",
        type: "text",
        required: false,
        presentable: false,
        system: false,
        hidden: false,
        min: null, max: null, pattern: ""
      }
    ],
    indexes: [
      "CREATE UNIQUE INDEX idx_config_clave ON config (clave)"
    ],
    listRule: "@request.auth.id != ''",
    viewRule: "@request.auth.id != ''",
    createRule: "@request.auth.id != ''",
    updateRule: "@request.auth.id != ''",
    deleteRule: "@request.auth.id != ''"
  })
  app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("rune_config0001")
  app.delete(collection)
})
