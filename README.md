# Sistema de Ventas con Turso

Este es un sistema de ventas simple que utiliza Turso como base de datos distribuida para almacenar productos y ventas.

## Requisitos

- Node.js (versión 14 o superior)
- NPM (incluido con Node.js)
- Una cuenta en Turso (https://turso.tech)

## Estructura del Proyecto

```
libreria web/
├── data/
├── index.html
├── styles.css
├── script.js
├── server.js
├── package.json
└── .env
```

## Configuración de Turso

1. Instalar Turso CLI:
   ```bash
   curl -sSfL https://get.tur.so/install.sh | bash
   ```

2. Iniciar sesión en Turso:
   ```bash
   turso auth login
   ```

3. Crear una nueva base de datos:
   ```bash
   turso db create sistema-ventas
   ```

4. Obtener la URL de la base de datos:
   ```bash
   turso db show sistema-ventas
   ```

5. Crear un token de autenticación:
   ```bash
   turso db tokens create sistema-ventas
   ```

6. Configurar las variables de entorno:
   - Copiar la URL de la base de datos y el token en el archivo `.env`:
   ```env
   TURSO_DATABASE_URL=libsql://tu-url-de-base-de-datos
   TURSO_AUTH_TOKEN=tu-token-de-autenticacion
   ```

## Instalación

1. Instalar las dependencias:
   ```bash
   npm install
   ```

## Ejecución

1. Iniciar el servidor:
   ```bash
   npm start
   ```

2. Abrir el archivo `index.html` en tu navegador web.

## Características

- Interfaz intuitiva y responsiva
- Gestión de productos (agregar, eliminar)
- Registro de ventas con historial
- Almacenamiento persistente en Turso
- Soporte para lector de código de barras

## Uso

1. **Agregar Productos**:
   - Ingresa el código, nombre, precio y cantidad del producto
   - Haz clic en "Agregar"

2. **Finalizar Venta**:
   - Los productos agregados aparecerán en la tabla de venta actual
   - El total se calcula automáticamente
   - Haz clic en "Finalizar Venta" para registrar la venta

3. **Ver Historial**:
   - El historial de ventas se muestra en la parte inferior
   - Incluye fecha, productos vendidos y total

## Notas

- Los datos se almacenan de forma segura en Turso
- La aplicación requiere conexión a internet para funcionar
- Las credenciales de Turso deben mantenerse seguras