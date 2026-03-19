# profile-manager-magneto-mvp

# Profile Manager PoC

Prueba de concepto del proyecto Profile Manager, enfocada en validar la viabilidad técnica de un flujo mínimo funcional para recomendación de vacantes.

## Funcionalidades incluidas

- Registro de usuario
- Guardado de perfil básico
- Recomendación de vacantes desde dataset mock
- Score con desglose y razones
- Postulación
- Registro de evento APPLY
- Visualización simple de postulaciones

## Tecnologías usadas

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js + Express
- Datos mock: JSON
- Control de versiones: GitHub

## Cómo ejecutar

### Backend
Entrar a la carpeta backend e instalar dependencias:

npm install

Luego ejecutar:

node server.js

### Frontend
Abrir el archivo `frontend/index.html` en el navegador.

## Entrada
Datos del usuario y skills ingresadas manualmente.

## Proceso
Validación, cálculo de score, generación de explicación y registro de postulación.

## Salida
Vacantes recomendadas con score, desglose, razones y confirmación de postulación.