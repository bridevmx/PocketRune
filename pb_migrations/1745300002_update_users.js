/// <reference path="../pb_data/types.d.ts" />
// 2/9 — Users: modifica la coleccion existente, agrega name, phone, avatar, role

migrate((app) => {
  // PocketBase ya crea 'users' al iniciar — la buscamos y modificamos
  const collection = app.findCollectionByNameOrId("users")

  // Reglas de acceso
  collection.listRule   = "id = @request.auth.id"
  collection.viewRule   = "id = @request.auth.id"
  collection.createRule = ""
  collection.updateRule = "id = @request.auth.id"
  collection.deleteRule = "id = @request.auth.id"

  // Metodos de autenticacion
  collection.passwordAuth = { enabled: true, identityFields: ["email", "username"] }
  collection.oauth2 = {
    enabled: false,
    mappedFields: { id: "", name: "", username: "", avatarURL: "" },
    providers: []
  }
  collection.mfa = { enabled: false, duration: 600, rule: "" }
  collection.otp = {
    enabled: false,
    duration: 180,
    length: 8,
    emailTemplate: {
      subject: "OTP para {APP_NAME}",
      body: "<p>Hola,</p><p>Tu codigo de un solo uso es: <strong>{OTP}</strong></p><p>Si no lo solicitaste, ignora este correo.</p><p>Gracias,<br/>{APP_NAME} team</p>"
    }
  }

  // Duraciones de tokens
  collection.authToken          = { duration: 604800 }
  collection.passwordResetToken = { duration: 1800 }
  collection.emailChangeToken   = { duration: 1800 }
  collection.verificationToken  = { duration: 259200 }
  collection.fileToken          = { duration: 120 }

  // Templates de email (body NO puede estar vacio)
  collection.verificationTemplate = {
    subject: "Verifica tu email en {APP_NAME}",
    body: "<p>Hola,</p><p>Gracias por registrarte en {APP_NAME}.</p><p><a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-verification/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Verificar email</a></p><p>Gracias,<br/>{APP_NAME}</p>"
  }
  collection.resetPasswordTemplate = {
    subject: "Restablece tu contrasena en {APP_NAME}",
    body: "<p>Hola,</p><p>Haz clic para restablecer tu contrasena.</p><p><a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-password-reset/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Restablecer contrasena</a></p><p>Si no solicitaste esto, ignora este correo.</p><p>Gracias,<br/>{APP_NAME}</p>"
  }
  collection.confirmEmailChangeTemplate = {
    subject: "Confirma tu nuevo email en {APP_NAME}",
    body: "<p>Hola,</p><p>Confirma tu nuevo email.</p><p><a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-email-change/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Confirmar nuevo email</a></p><p>Si no solicitaste esto, ignora este correo.</p><p>Gracias,<br/>{APP_NAME}</p>"
  }
  collection.authAlert = {
    enabled: true,
    emailTemplate: {
      subject: "Nuevo inicio de sesion en {APP_NAME}",
      body: "<p>Hola,</p><p>Detectamos un inicio de sesion desde una nueva ubicacion en {APP_NAME}:</p><p><em>{ALERT_INFO}</em></p><p>Si no fuiste tu, cambia tu contrasena de inmediato.</p><p>Gracias,<br/>{APP_NAME} team</p>"
    }
  }

  // Agregar campos extra
  collection.fields.add(new Field({
    id: "rune_usr_name1",
    name: "name",
    type: "text",
    required: false,
    presentable: true,
    system: false,
    hidden: false,
    min: null, max: null, pattern: ""
  }))
  collection.fields.add(new Field({
    id: "rune_usr_phone",
    name: "phone",
    type: "text",
    required: false,
    presentable: false,
    system: false,
    hidden: false,
    min: null, max: null, pattern: ""
  }))
  collection.fields.add(new Field({
    id: "rune_usr_avtar",
    name: "avatar",
    type: "text",
    required: false,
    presentable: false,
    system: false,
    hidden: false,
    min: null, max: null, pattern: ""
  }))
  collection.fields.add(new Field({
    id: "rune_usr_role1",
    name: "role",
    type: "relation",
    required: false,
    system: false,
    hidden: false,
    collectionId: "rune_roles00001",
    collectionName: "roles",
    maxSelect: 1,
    cascadeDelete: false
  }))

  app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("users")
  const toRemove = ["name", "phone", "avatar", "role"]
  for (const name of toRemove) {
    const field = collection.fields.getByName(name)
    if (field) collection.fields.remove(field)
  }
  app.save(collection)
})
