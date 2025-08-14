require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@libsql/client');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de Turso
const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN
});

// Inicializar las tablas si no existen
async function initializeTables() {
    try {
        await client.execute(`
            CREATE TABLE IF NOT EXISTS productos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                codigo TEXT NOT NULL,
                nombre TEXT NOT NULL,
                precio REAL NOT NULL,
                cantidad INTEGER NOT NULL
            )
        `);

        await client.execute(`
            CREATE TABLE IF NOT EXISTS ventas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
                productos TEXT NOT NULL,
                total REAL NOT NULL
            )
        `);

        console.log('Tablas inicializadas correctamente');
    } catch (error) {
        console.error('Error al inicializar las tablas:', error);
    }
}

// Rutas para productos
app.get('/api/productos', async (req, res) => {
    try {
        const result = await client.execute('SELECT * FROM productos');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

app.post('/api/productos', async (req, res) => {
    try {
        const { codigo, nombre, precio, cantidad } = req.body;
        const result = await client.execute({
            sql: 'INSERT INTO productos (codigo, nombre, precio, cantidad) VALUES (?, ?, ?, ?)',
            args: [codigo, nombre, precio, cantidad]
        });
        res.json({ id: result.lastInsertRowid, codigo, nombre, precio, cantidad });
    } catch (error) {
        console.error('Error al guardar producto:', error);
        res.status(500).json({ error: 'Error al guardar producto' });
    }
});

// Rutas para ventas
app.get('/api/ventas', async (req, res) => {
    try {
        const result = await client.execute('SELECT * FROM ventas ORDER BY fecha DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener ventas:', error);
        res.status(500).json({ error: 'Error al obtener ventas' });
    }
});

app.post('/api/ventas', async (req, res) => {
    try {
        const { productos, total } = req.body;
        const result = await client.execute({
            sql: 'INSERT INTO ventas (productos, total) VALUES (?, ?)',
            args: [JSON.stringify(productos), total]
        });
        res.json({ id: result.lastInsertRowid, fecha: new Date(), productos, total });
    } catch (error) {
        console.error('Error al guardar venta:', error);
        res.status(500).json({ error: 'Error al guardar venta' });
    }
});

// Inicializar tablas y servidor
initializeTables().then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
});