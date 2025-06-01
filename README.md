# API CRUD de Artículos - Flexxus (Prueba Técnica)

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=for-the-badge&logo=node.js) ![Express.js](https://img.shields.io/badge/Express.js-4.x-lightgrey?style=for-the-badge&logo=express) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript) ![JWT](https://img.shields.io/badge/JWT-Auth-purple?style=for-the-badge&logo=jsonwebtokens) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-DB-blue?style=for-the-badge&logo=postgresql) <!-- O la BD que hayas usado -->

Este repositorio contiene el desarrollo de una API RESTful como parte de una prueba técnica. La API gestiona un CRUD de artículos, cumpliendo con especificaciones de funcionalidad, seguridad, validación y buenas prácticas de desarrollo.

## 📜 Descripción del Proyecto

La API implementa operaciones CRUD completas (Crear, Leer, Actualizar, Eliminar) para la entidad "Artículos". Cada artículo cuenta con un identificador único (PK), nombre, fecha de modificación, marca y estado de activación.

**Operaciones Específicas Implementadas:**
*   **GET /articulos:** Permite obtener una lista de artículos con opciones de filtrado por:
    *   Coincidencia parcial del nombre.
    *   Estado de activación (activo/inactivo).
    *   Búsqueda exacta (combinando criterios).
*   **GET /articulos/{id}:** Obtiene un artículo específico por su ID.
*   **POST /articulos:** Crea un nuevo artículo. Requiere `nombre` y `marca`.
*   **PUT /articulos/{id}:** Actualiza uno o más campos de un artículo existente (excepto su ID).
*   **DELETE /articulos/{id}:** Realiza un borrado lógico del artículo (lo desactiva) en lugar de eliminarlo físicamente de la base de datos.

**Autenticación y Autorización:**
*   Las rutas de la API están protegidas mediante autenticación basada en JSON Web Tokens (JWT).
*   Se requiere un token válido en el header `Authorization: Bearer <token>` para acceder a los endpoints de gestión de artículos.
*   El endpoint `POST /auth/login` permite obtener un token de acceso.

## ✨ Características y Pautas Cumplidas

Este proyecto fue desarrollado siguiendo las siguientes pautas y mejores prácticas:

*   🧱 **Arquitectura Adecuada:** Se ha diseñado una arquitectura en capas (controladores, modelos, rutas) para promover la modularidad, escalabilidad y mantenibilidad.
*   🛡️ **Seguridad en las Rutas:** Implementación de autenticación JWT para proteger los endpoints. Se utiliza `passport` y `passport-jwt`.
*   🔑 **Limitación de Intentos de Login:** Para prevenir ataques de fuerza bruta en el endpoint de login.
*   📋 **Validación de Datos:** Se realizan validaciones tanto en los datos de entrada (request body, query params) como en los datos de salida (respuestas) para asegurar la integridad y consistencia. 
*   🧼 **Código Limpio y Estructurado:** El código está escrito en TypeScript, siguiendo principios de código limpio, con una estructura clara y comentarios donde es necesario para facilitar su comprensión y mantenimiento.
*   💾 **Conexión a Base de Datos:** Se utiliza Sqlite con un ORM (Sequelize) para la persistencia de datos.
*   📄 **Documentación del API:** La documentación completa y detallada de la API, incluyendo todos los endpoints, parámetros, ejemplos de solicitud y respuesta, está disponible a través de Postman.
    *   **[Ver Documentación de la API en Postman](https://documenter.getpostman.com/view/27002974/2sB2qgeeGa#b2e20146-ebc3-40fb-865a-555492708a6e)** 
*   🚀 **Control de Versiones:** Todo el código fuente y la configuración se encuentran versionados en este repositorio de GitHub.

## 🛠️ Tecnologías Utilizadas

*   **Backend:** Node.js, Express.js
*   **Lenguaje:** TypeScript
*   **Autenticación:** JSON Web Tokens (JWT) con `passport`, `passport-jwt`, `jsonwebtoken`
*   **Base de Datos:** sqlite 
*   **ORM:** Sequelize
*   **Limitación de Tasa:** `express-rate-limit`
*   **Hashing de Contraseñas:** `bcrypt`
*   **Variables de Entorno:** `dotenv`
*   **Herramientas de Desarrollo:** Nodemon

## ⚙️ Configuración y Puesta en Marcha

### Prerrequisitos

*   Node.js (v18.x o superior recomendado)
*   npm (v9.x o superior recomendado) 
*   Sqlite
*   Una instancia de Postman (opcional, para probar los endpoints fácilmente).

### Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/christianutn/CRUD-Articulos.git
    cd CRUD-Articulos
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    # o
    # yarn install
    ```

3.  **Configurar variables de entorno:**
    *   Crea un archivo `.env` en la raíz del proyecto. A continuación dejo contenido ejemplo del archivo .env:
      ```env
      PORT = 4000
      JWT_SECRET=kasdjaksjdlkajsdlcqwop
      JWT_EXPIRES_IN=365d # JWT expiration time, Solo para facilitar las pruebas en postman de una forma sencilla
      SALT = "10"
      ```
    

### Ejecución

1.  **Ejecutar en modo desarrollo (con recarga automática):**
    ```bash
    npm run dev
    ```
    La API estará disponible en `http://localhost:PORT`.

    Está configurado para primero compilar y luego ejecutar.
    
## 🚀 Endpoints Principales

Una visión general de los endpoints disponibles (para detalles completos, ver la documentación en Postman):

*   **Autenticación:**
    *   `POST /api/auth/login`: Inicia sesión y obtiene un token JWT.
*   **Artículos:**
    *   `GET /api/articulos`: Obtiene todos los artículos (con filtros).
    *   `GET /api/articulos/{id}`: Obtiene un artículo por ID.
    *   `POST /api/articulos`: Crea un nuevo artículo.
    *   `PUT /api/articulos/{id}`: Actualiza un artículo existente.
    *   `DELETE /api/articulos/{id}`: Desactiva un artículo (borrado lógico).



## 📝 Importante: 

Para facilitar la prueba la base de datos se carga en memoria RAM, inicializandose con datos de prueba. 



---


