Vue Store

Tienda virtual desarrollada con Vue 3, TypeScript, Vite, Pinia, Vue Router y Tailwind CSS. El proyecto consume la API pública de DummyJSON para mostrar productos, categorías, búsquedas y detalles.

Descripción

Vue Store es una aplicación de comercio electrónico del lado del cliente. Permite explorar productos, buscar y filtrar el catálogo, consultar el detalle de cada producto, guardar favoritos, administrar un carrito y completar un checkout simulado.

El proyecto fue construido con una arquitectura modular, componentes reutilizables, estado global con Pinia y persistencia local mediante localStorage.

Funcionalidades

Landing page de inicio.

Catálogo de productos.

Búsqueda con debounce.

Filtro por categorías.

Ordenamiento por nombre, precio, valoración y stock.

Paginación.

Vista detallada del producto.

Galería de imágenes.

Selector de cantidad limitado por stock.

Carrito de compras.

Persistencia del carrito en localStorage.

Productos favoritos.

Persistencia de favoritos en localStorage.

Checkout simulado.

Validación de formularios.

Página de confirmación del pedido.

Modo claro y oscuro.

Diseño responsive.

Manejo de estados de carga, errores y resultados vacíos.

Tecnologías utilizadas

Vue 3

TypeScript

Vite

Vue Router

Pinia

Tailwind CSS

Axios

VueUse

DummyJSON

ESLint

Prettier

Requisitos

Antes de ejecutar el proyecto, instala:

Node.js 20 o superior.

npm 10 o superior.

Comprueba las versiones instaladas:

node --version
npm --version

Instalación

Clona el repositorio:

git clone URL_DEL_REPOSITORIO

Entra en el directorio del proyecto:

cd vue-store

Instala las dependencias:

npm install

Variables de entorno

Crea un archivo .env en la raíz del proyecto:

VITE_API_BASE_URL=https://dummyjson.com

También puedes crear .env.example con el mismo contenido para documentar la configuración sin exponer valores privados:

VITE_API_BASE_URL=https://dummyjson.com

Ejecución en desarrollo

npm run dev

La aplicación estará disponible normalmente en:

http://localhost:5173

Compilación para producción

npm run build

Los archivos generados se guardarán en:

dist/

Para revisar localmente la compilación:

npm run preview

Comandos disponibles

npm run dev

Inicia el servidor de desarrollo.

npm run build

Ejecuta la comprobación de tipos y genera la compilación de producción.

npm run preview

Sirve localmente la compilación generada.

npm run lint

Analiza el código con ESLint.

npm run format

Formatea el proyecto con Prettier.

npm run type-check

Comprueba los tipos de TypeScript y los componentes Vue.

Algunos comandos pueden variar según el contenido actual de package.json.

Estructura del proyecto

src/
├── assets/
│ ├── main.css
│ └── product-placeholder.svg
├── components/
│ ├── base/
│ ├── cart/
│ ├── checkout/
│ ├── favorites/
│ ├── forms/
│ ├── layout/
│ └── products/
├── constants/
├── layouts/
├── router/
├── services/
├── stores/
├── types/
├── utils/
├── views/
├── App.vue
└── main.ts

Directorios principales

components/: componentes reutilizables de la interfaz.

views/: páginas asociadas a las rutas.

stores/: stores de Pinia para productos, carrito, favoritos, checkout y configuración.

services/: comunicación con la API.

types/: interfaces y tipos de TypeScript.

utils/: funciones auxiliares para precios, carrito, texto y validaciones.

router/: configuración de Vue Router.

layouts/: estructura general de las páginas.

constants/: opciones y constantes compartidas.

Rutas principales

Ruta

Descripción

/

Landing page de inicio

/products

Catálogo de productos

/products/:id

Detalle de un producto

/favorites

Productos favoritos

/cart

Carrito de compras

/checkout

Formulario de checkout

/checkout/success

Confirmación del pedido

API

El proyecto utiliza DummyJSON.

URL base:

https://dummyjson.com

Endpoints principales:

GET /products
GET /products/:id
GET /products/search?q=phone
GET /products/category-list
GET /products/category/:category

Estado global

La aplicación utiliza Pinia para administrar:

Productos y categorías.

Búsqueda, filtros, ordenamiento y paginación.

Producto seleccionado.

Carrito de compras.

Productos favoritos.

Datos y estado del checkout.

Tema claro u oscuro.

Persistencia local

Se utiliza localStorage para conservar información entre recargas.

Claves utilizadas:

vue-store-cart
vue-store-favorites
vue-store-last-order

El tema también puede almacenarse localmente según la implementación del store principal.

El almacenamiento local es adecuado para esta demostración, pero no sustituye una base de datos ni la validación de un servidor.

Checkout

El checkout es una simulación educativa.

No se procesa ningún pago real.

No se envían datos bancarios a un servidor.

No deben introducirse tarjetas reales.

Los datos sensibles de la tarjeta no se guardan en localStorage.

Al completar el flujo se genera una orden simulada y se vacía el carrito.

Modo oscuro

El tema se controla agregando o eliminando la clase dark en el elemento raíz:

document.documentElement.classList.toggle('dark')

Tailwind utiliza esta clase para aplicar las variantes oscuras.

Calidad del código

Antes de publicar cambios, ejecuta:

npm run format
npm run lint
npm run type-check
npm run build

Todos los comandos deben finalizar sin errores.

Flujo recomendado de Git

Crea una rama para cada funcionalidad:

git checkout -b feature/nombre-funcionalidad

Guarda los cambios:

git add .
git commit -m "feat: agregar nombre de la funcionalidad"

Envía la rama:

git push origin feature/nombre-funcionalidad

Aviso

Este proyecto tiene fines educativos y de demostración. Los productos, precios, imágenes y reseñas son proporcionados por DummyJSON.

Autor

Alexander Marizan

Licencia

Este proyecto puede utilizarse con fines educativos. Agrega una licencia específica, como MIT, si planeas publicarlo o distribuirlo.
