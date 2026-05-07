# catalogo-api

API REST para administrar productos y categorías de una tienda pequeña.
Stack: **NestJS · Mongoose · MongoDB**


## Instalación y ejecución

bash
# 1. Instalar dependencias
npm install

# 2. Crear el archivo de variables de entorno
cp .env.example .env

# 3. Editar .env con tu URL de MongoDB

# 4. Levantar en modo desarrollo
npm run start:dev

La API queda disponible en `http://localhost:3000`.

## Variables de entorno

| Variable | Descripción | Ejemplo |
| `MONGO_URI` | URL de conexión a MongoDB | `mongodb://localhost:27017/catalogo` |
| `PORT` | Puerto donde escucha la API | `3000` |


## Colección Bruno

### Cómo importar

1. Abrir Bruno
2. Clic en **Open Collection**
3. Seleccionar la carpeta `/bruno` del proyecto
4. Arriba a la derecha seleccionar el entorno **local**

### Variables de la colección

| Variable | Valor | Se actualiza automáticamente |
| `baseUrl` | `http://localhost:3000` | No |
| `categoriaId` | vacío | Sí, al ejecutar **Crear categoría** |
| `productoId` | vacío | Sí, al ejecutar **Crear producto** |

### Orden de ejecución

1. Ejecutar **Crear categoría** → guarda `categoriaId` automáticamente
2. Ejecutar **Crear producto** → guarda `productoId` automáticamente
3. El resto de peticiones ya funcionan con esas variables