const apiUrl = 'http://localhost:8000/productos';

function mostrarProductos(productos) {
    const listaProductos = document.getElementById('lista-productos');
    listaProductos.innerHTML = ''; // Limpiar la tabla antes de renderizar
    productos.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${producto.id}</td>
          <td>${producto.nombre}</td>
          <td>${producto.descripcion}</td>
          <td>${producto.precio_pesos}</td>
          <td>${(producto.precio_usd)}</td>
          <td>
            <button onclick="show(${producto.id})">Ver</button>
            <button onclick="editarProducto(${producto.id})">Editar</button>
            <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
          </td>
        `;
        listaProductos.appendChild(fila);
    });
}

async function obtenerProductos() {
    try {
        const respuesta = await fetch(apiUrl);
        if (!respuesta.ok) throw new Error('Error al obtener productos');
        const productos = await respuesta.json();
        mostrarProductos(productos);
    } catch (error) {
        console.error(error);
        alert('Hubo un error al cargar los productos');
    }
}

function buscarPorId() {
    const id = document.getElementById("buscar-id").value;
    if (!id) return;

    show(id)
}

function show(id) {
    fetch(`${apiUrl}/${id}`)
        .then(res => res.json())
        .then(producto => {
            if (!producto) return alert('Producto no encontrado');
            mostrarVistaShow(producto);
        })
        .catch(error => alert('Producto no encontrado'));
}

function mostrarVistaShow(producto) {
    ocultarVistas();
    document.getElementById("vista-show-producto").style.display = 'block';
    document.getElementById("detalle-producto").innerHTML = `
        <h2>Producto ${producto.id}</h2>
        <p>Nombre: ${producto.nombre}</p>
        <p>Descripción: ${producto.descripcion}</p>
        <p>Precio: ${producto.precio_pesos} Pesos</p>
        <p>Precio en USD: ${(producto.precio_usd)}</p>
    `;
}

function volverVista() {
    obtenerProductos();
    document.getElementById("vista-show-producto").style.display = 'none';
    document.getElementById("titulo-productos").style.display = 'block';
    document.getElementById("tabla-productos").style.display = 'table';
}

function mostrarFormularioCrear() {
    ocultarVistas();
    document.getElementById("formulario-crear").style.display = 'block';
}

function editarProducto(id) {
    // fetch(`${apiUrl}/${id}`)
    fetch(`${apiUrl}/${id}`)
        .then(res => res.json())
        .then(producto => {
            document.getElementById("formulario-editar").style.display = 'block';
            document.getElementById("nombre-producto-editar").value = producto.nombre;
            document.getElementById("descripcion-producto-editar").value = producto.descripcion;
            document.getElementById("precio-producto-editar").value = producto.precio_pesos;
            document.getElementById('formulario-editar-producto').onsubmit = function(event) {
                event.preventDefault();
                actualizarProducto(id);
            };
        })
        .catch(error => alert('Producto no encontrado'));
}

function cancelarFormulario() {
    document.getElementById("formulario-crear").style.display = 'none';
    document.getElementById("formulario-editar").style.display = 'none';
    document.getElementById("titulo-productos").style.display = 'block';
    document.getElementById("tabla-productos").style.display = 'table';
    limpiarErrores();
}

async function agregarProducto(evento) {
    evento.preventDefault();
    const nombre = document.getElementById('nombre-producto').value;
    const descripcion = document.getElementById('descripcion-producto').value;
    const precio = document.getElementById('precio-producto').value;

    const nuevoProducto = {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio
    };

    try {
        const respuesta = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoProducto)
        });

        if (!respuesta.ok) {
            const datosError = await respuesta.json();
            mostrarErrores(datosError.errors, 'errores-crear');
            throw new Error('Error al agregar producto');
        }

        await obtenerProductos();
        cancelarFormulario();
    } catch (error) {
        console.error(error);
    }
}

async function actualizarProducto(id) {
    const nombre = document.getElementById('nombre-producto-editar').value;
    const descripcion = document.getElementById('descripcion-producto-editar').value;
    const precio = document.getElementById('precio-producto-editar').value;

    const productoEditado = {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio
    };

    try {
        const respuesta = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productoEditado)
        });

        if (!respuesta.ok) {
            const datosError = await respuesta.json();
            mostrarErrores(datosError.errors, 'errores-editar'); // Mostrar errores
            throw new Error('Error al editar producto');
        }
        obtenerProductos();
        cancelarFormulario();
    } catch (error) {
        console.error(error);
    }
}

async function eliminarProducto(id) {
    try {
        // Mostrar un mensaje de confirmación antes de eliminar el producto
        let eliminarConfirm;
        eliminarConfirm = confirm('¿Está seguro de que desea eliminar este producto?');
        if (!eliminarConfirm) return;
        const respuesta = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        });

        if (!respuesta.ok) throw new Error('Error al eliminar producto');
        obtenerProductos();
    } catch (error) {
        console.error(error);
    }
}

function mostrarErrores(errors, idContenedor) {
    const contenedorErrores = document.getElementById(idContenedor);
    contenedorErrores.innerHTML = ''; // Limpiar errores anteriores

    if (errors && typeof errors === 'object') {
        const listaErrores = document.createElement('ul');
        Object.values(errors).forEach(error => {
            const item = document.createElement('li');
            item.textContent = error; // Mostrar el mensaje del error
            listaErrores.appendChild(item);
        });
        contenedorErrores.appendChild(listaErrores);
    } else {
        // Mostrar un mensaje genérico si no se encuentran errores específicos
        contenedorErrores.textContent = 'Se produjo un error. Intente nuevamente.';
    }
}

function limpiarErrores() {
    const contenedorErroresCrear = document.getElementById('errores-crear');
    contenedorErroresCrear.innerHTML = '';
    contenedorErroresCrear.style.display = 'none';
    const contenedorErroresEditar = document.getElementById('errores-editar');
    contenedorErroresEditar.innerHTML = '';
    contenedorErroresEditar.style.display = 'none';
}


function ocultarVistas() {
    document.getElementById("vista-show-producto").style.display = 'none';
    document.getElementById("formulario-crear").style.display = 'none';
    document.getElementById("formulario-editar").style.display = 'none';
    document.getElementById("titulo-productos").style.display = 'none';
    document.getElementById("tabla-productos").style.display = 'none';
}

document.getElementById('formulario-agregar-producto').addEventListener('submit', agregarProducto);

obtenerProductos();
