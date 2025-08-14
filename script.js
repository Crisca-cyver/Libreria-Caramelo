// Variables globales
let productosEnVenta = [];

// Funciones de la API
async function obtenerProductos() {
    try {
        const response = await fetch('/api/productos');
        return await response.json();
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return [];
    }
}

async function guardarProducto(producto) {
    try {
        const response = await fetch('/api/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });
        return await response.json();
    } catch (error) {
        console.error('Error al guardar producto:', error);
        throw error;
    }
}

async function obtenerVentas() {
    try {
        const response = await fetch('/api/ventas');
        return await response.json();
    } catch (error) {
        console.error('Error al obtener ventas:', error);
        return [];
    }
}

async function guardarVenta(venta) {
    try {
        const response = await fetch('/api/ventas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(venta)
        });
        return await response.json();
    } catch (error) {
        console.error('Error al guardar venta:', error);
        throw error;
    }
}

// Funciones de la interfaz
function agregarProducto(event) {
    event.preventDefault();
    
    const codigo = document.getElementById('codigo').value;
    const nombre = document.getElementById('nombre').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const cantidad = parseInt(document.getElementById('cantidad').value);

    if (!codigo || !nombre || isNaN(precio) || isNaN(cantidad)) {
        alert('Por favor complete todos los campos correctamente');
        return;
    }

    const producto = { codigo, nombre, precio, cantidad };
    productosEnVenta.push(producto);
    actualizarTablaVenta();
    limpiarFormulario();
}

function actualizarTablaVenta() {
    const tabla = document.getElementById('tablaVenta').getElementsByTagName('tbody')[0];
    tabla.innerHTML = '';
    let total = 0;

    productosEnVenta.forEach((producto, index) => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        const fila = tabla.insertRow();
        fila.innerHTML = `
            <td>${producto.codigo}</td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>${producto.cantidad}</td>
            <td>$${subtotal.toFixed(2)}</td>
            <td>
                <button onclick="eliminarProducto(${index})" class="btn-eliminar">Eliminar</button>
            </td>
        `;
    });

    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

function eliminarProducto(index) {
    productosEnVenta.splice(index, 1);
    actualizarTablaVenta();
}

async function finalizarVenta() {
    if (productosEnVenta.length === 0) {
        alert('No hay productos en la venta actual');
        return;
    }

    const total = productosEnVenta.reduce((sum, producto) => {
        return sum + (producto.precio * producto.cantidad);
    }, 0);

    try {
        await guardarVenta({
            total,
            productos: productosEnVenta
        });

        productosEnVenta = [];
        actualizarTablaVenta();
        actualizarHistorial();
        alert('Venta finalizada con éxito');
    } catch (error) {
        alert('Error al finalizar la venta');
    }
}

async function actualizarHistorial() {
    const ventas = await obtenerVentas();
    const tabla = document.getElementById('tablaHistorial').getElementsByTagName('tbody')[0];
    tabla.innerHTML = '';

    ventas.forEach(venta => {
        const fecha = new Date(venta.fecha).toLocaleString();
        const productos = JSON.parse(venta.productos);
        const fila = tabla.insertRow();
        fila.innerHTML = `
            <td>${fecha}</td>
            <td>${productos.map(p => `${p.nombre} (${p.cantidad})`).join(', ')}</td>
            <td>$${venta.total.toFixed(2)}</td>
        `;
    });
}

function limpiarFormulario() {
    document.getElementById('formularioProducto').reset();
    document.getElementById('codigo').focus();
}

// Event Listeners
document.getElementById('formularioProducto').addEventListener('submit', agregarProducto);
document.getElementById('btnFinalizarVenta').addEventListener('click', finalizarVenta);

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    actualizarHistorial();
});

// Soporte para lector de código de barras
document.getElementById('codigo').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('nombre').focus();
    }
});