/// <reference path="../pb_data/types.d.ts" />
// 5/9 — Campos por entidad → FormField renderer

migrate((app) => {
  const collection = new Collection({
    id: "rune_campos0001",
    name: "campos",
    type: "base",
    system: false,
    fields: [
      { id: "cam_entidad001", name: "entidad",            type: "text",   required: true,  presentable: false, system: false, hidden: false, min: null, max: null, pattern: "" },
      { id: "cam_nombre0001", name: "nombre",             type: "text",   required: true,  presentable: false, system: false, hidden: false, min: null, max: null, pattern: "" },
      { id: "cam_label00001", name: "label",              type: "text",   required: true,  presentable: true,  system: false, hidden: false, min: null, max: null, pattern: "" },
      {
        id: "cam_pb_tipo001",
        name: "pb_tipo",
        type: "select",
        required: true, system: false, hidden: false,
        values: ["text","number","bool","email","url","date","select","file","json","relation","autodate"],
        maxSelect: 1
      },
      {
        id: "cam_daisy_comp",
        name: "daisyui_componente",
        type: "select",
        required: true, system: false, hidden: false,
        values: ["input_text","textarea","input_tel","input_email","input_number","input_currency","range","input_date","input_datetime","input_time","select","radio_group","checkbox_group","toggle","relation_select","relation_search","file_input","image_upload","badge_estado","stat_number","qr_code","whatsapp_link","star_rating"],
        maxSelect: 1
      },
      {
        id: "cam_ancho_form",
        name: "ancho_form",
        type: "select",
        required: false, system: false, hidden: false,
        values: ["completo","mitad","tercio"],
        maxSelect: 1
      },
      {
        id: "cam_daisy_size",
        name: "daisyui_size",
        type: "select",
        required: false, system: false, hidden: false,
        values: ["xs","sm","md","lg"],
        maxSelect: 1
      },
      { id: "cam_requerid01", name: "requerido",          type: "bool",   required: false, system: false, hidden: false },
      { id: "cam_placehold1", name: "placeholder",        type: "text",   required: false, presentable: false, system: false, hidden: false, min: null, max: null, pattern: "" },
      { id: "cam_val_deflt1", name: "valor_default",      type: "text",   required: false, presentable: false, system: false, hidden: false, min: null, max: null, pattern: "" },
      { id: "cam_icono0001",  name: "icono",              type: "text",   required: false, presentable: false, system: false, hidden: false, min: null, max: null, pattern: "" },
      { id: "cam_es_estado1", name: "es_campo_estado",    type: "bool",   required: false, system: false, hidden: false },
      { id: "cam_col_relat1", name: "coleccion_relacion", type: "text",   required: false, presentable: false, system: false, hidden: false, min: null, max: null, pattern: "" },
      { id: "cam_vis_lista1", name: "visible_lista",      type: "bool",   required: false, system: false, hidden: false },
      { id: "cam_vis_form01", name: "visible_form",       type: "bool",   required: false, system: false, hidden: false },
      { id: "cam_buscable01", name: "buscable",           type: "bool",   required: false, system: false, hidden: false },
      { id: "cam_orden00001", name: "orden",              type: "number", required: false, system: false, hidden: false, min: null, max: null, noDecimal: true },
      { id: "cam_grupo_form", name: "grupo_form",         type: "text",   required: false, presentable: false, system: false, hidden: false, min: null, max: null, pattern: "" }
    ],
    indexes: [
      "CREATE UNIQUE INDEX idx_campos_unique ON campos (entidad, nombre)"
    ],
    listRule: "@request.auth.id != ''",
    viewRule: "@request.auth.id != ''",
    createRule: "@request.auth.id != ''",
    updateRule: "@request.auth.id != ''",
    deleteRule: "@request.auth.id != ''"
  })
  app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("rune_campos0001")
  app.delete(collection)
})
