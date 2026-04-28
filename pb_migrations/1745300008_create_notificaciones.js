/// <reference path="../pb_data/types.d.ts" />
// 8/9 — Notificaciones internas del sistema

migrate((app) => {
  const collection = new Collection({
    id: "rune_notifs001",
    name: "notificaciones",
    type: "base",
    system: false,
    fields: [
      { id: "not_titulo0001", name: "titulo",      type: "text",   required: true,  presentable: true,  system: false, hidden: false, min: null, max: null, pattern: "" },
      { id: "not_cuerpo0001", name: "cuerpo",      type: "text",   required: false, presentable: false, system: false, hidden: false, min: null, max: null, pattern: "" },
      { id: "not_entidad001", name: "entidad",     type: "text",   required: false, presentable: false, system: false, hidden: false, min: null, max: null, pattern: "" },
      { id: "not_ent_id001",  name: "entidad_id",  type: "text",   required: false, presentable: false, system: false, hidden: false, min: null, max: null, pattern: "" },
      {
        id: "not_tipo000001",
        name: "tipo",
        type: "select",
        required: false, system: false, hidden: false,
        values: ["info","success","warning","error"],
        maxSelect: 1
      },
      { id: "not_leida00001", name: "leida",       type: "bool",   required: false, system: false, hidden: false },
      {
        id: "not_user000001",
        name: "user",
        type: "relation",
        required: false, system: false, hidden: false,
        collectionId: "_pb_users_auth_",
        collectionName: "users",
        maxSelect: 1,
        cascadeDelete: false
      }
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
  const collection = app.findCollectionByNameOrId("rune_notifs001")
  app.delete(collection)
})
