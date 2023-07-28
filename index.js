const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const { getStudents, createStudents } = require('./model/estudiantes');

// RUTAS:
// Mostrar todo
app.get('/', async (req, res) => {
	try {
		const estudents = await getStudents();
		res.json(estudents);
	} catch (error) {
		res.status(500).send({ code: 500, error: error.message });
	}
});

// crear estudiante
app.get('/create', async (req, res) => {
	try {
		const { rut, nombre, curso, nivel } = req.query;
		const student = await createStudents(rut, nombre, curso, nivel);
		res.status(201).json(student);
	} catch (error) {
		res.status(500).send({ code: 500, error: error.message });
	}
});

app.listen(PORT, () => {
	console.log(`Escuchando en el puerto ${PORT}`);
});
