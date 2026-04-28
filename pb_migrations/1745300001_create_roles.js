/// <reference path="../pb_data/types.d.ts" />
// 1/9 — Roles con permisos JSON

migrate((app) => {
  const collection = new Collection({
    id: "rune_roles00001",
    name: "roles",
    type: "base",
    system: false,
    fields: [
      {
        id: "n4qxolmj7zfpwka",
        name: "nombre",
        type: "text",
        required: true,
        presentable: true,
        system: false,
        hidden: false,
        min: null,
        max: null,
        pattern: ""
      },
      {
        id: "s1vt3z9pcnmkwbf",
        name: "descripcion",
        type: "text",
        required: false,
        presentable: false,
        system: false,
        hidden: false,
        min: null,
        max: null,
        pattern: ""
      },
      {
        id: "q2rx4e6shbnkpvy",
        name: "es_admin",
        type: "bool",
        required: false,
        system: false,
        hidden: false
      },
      {
        id: "m7wy1k3zctqpdga",
        name: "permisos",
        type: "json",
        required: false,
        system: false,
        hidden: false,
        maxSize: 200000
      }
    ],
    indexes: [
      "CREATE UNIQUE INDEX idx_roles_nombre ON roles (nombre)"
    ],
    listRule: "@request.auth.id != ''",
    viewRule: "@request.auth.id != ''",
    createRule: "@request.auth.id != ''",
    updateRule: "@request.auth.id != ''",
    deleteRule: "@request.auth.id != ''"
  })
  app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("rune_roles00001")
  app.delete(collection)
})
