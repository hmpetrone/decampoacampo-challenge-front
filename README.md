#  Challenge Gestión de Productos - Frontend

Este proyecto es una interfaz web sencilla para gestionar productos mediante una API REST. Permite listar, agregar, editar y eliminar productos, mostrando los precios en pesos y en dólares.

## Requisitos Previos

- Navegador web.
- Tener instalado el proyecto back end del [Challenge Gestión de Productos - Backend](https://github.com/hmpetrone/decampoacampo-challenge).
- Asegúrate de que el backend esté configurado y ejecutándose. Este proyecto depende de esta API para la gestión de productos.

## Pasos para Ejecutar el Proyecto Localmente

### 1. Clonar el Repositorio

Clona este repositorio en tu máquina local utilizando el siguiente comando:

```bash
git clone <URL_DEL_REPOSITORIO>
```

### 2. Abrir el Proyecto en el Navegador

Para ejecutar el frontend abrir el archivo \`index.html\` en tu navegador (Click derecho -> "Abrir con...").

### 3. Probar las Funcionalidades

Una vez que el proyecto esté ejecutándose, podrás:

- **Listar productos**: Ver todos los productos registrados en la API.
- **Agregar productos**: Usar el formulario para agregar un nuevo producto.
- **Editar productos**: Hacer clic en el botón de editar y actualizar un producto existente.
- **Eliminar productos**: Usar el botón de eliminar para borrar un producto.
- **Buscar por ID**: Filtrar productos por su ID.

### 4. Configurar la URL de la API (Opcional)

Si el backend no está disponible en \`http://localhost:8000\`, actualiza la variable \`apiUrl\` en \`app.js\` con la URL correcta de tu API REST:

```javascript
const apiUrl = 'http://<URL_DE_TU_BACKEND>/productos';
```

## Notas

- **Cálculo del precio en dólares**: El precio en dólares se calcula dinámicamente en back end cada vez que se solicita un producto.
- **Manejo de errores**: Los errores en la interacción con la API (como fallos en la conexión o validaciones fallidas) se validan en back end y se muestran al usuario en la interfaz.

## Feedback

Estoy abierto a recibir tus observaciones o sugerencias que puedan ayudarme en futuros procesos de selección. Si tienes algún comentario, no dudes en enviarlo a mi correo personal: [hernan_hmp@hotmail.com](mailto:hernan_hmp@hotmail.com).

Gracias por la oportunidad y, en caso de no avanzar con el proceso, agradezco el tiempo invertido en la evaluación.
