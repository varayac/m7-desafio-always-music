const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const {
	getStudents,
	createStudent,
	updateStudent,
	deleteStudent,
	getStudentByRut,
} = require('./model/estudiantes');

// RUTAS:
// Mostrar todo: http://localhost:3000/
app.get('/', async (req, res) => {
	try {
		const estudiantes = await getStudents();
		if (estudiantes.error) throw estudiantes.error;
		// res.json(estudiantes);
		res.status(200).json({
			code: 200,
			message: `Listado de estudiantes`,
			estudiantes: estudiantes,
		});
	} catch (error) {
		res.status(500).send({ code: 500, error: error.message });
	}
});

// Mostar un estudiante por rut: http://localhost:3000/read?rut=11222333-4
app.get('/read', async (req, res) => {
	try {
		const rut = req.query.rut;
		const estudiante = await getStudentByRut(rut);
		if (estudiante.error) throw estudiante.error; // ejecuta el error si el ussuario no existe

		res.status(200).json({
			code: 200,
			message: `Estudiante encontrado`,
			estudiante: estudiante,
		});
	} catch (error) {
		res.status(404).send({ code: 404, error: error.message });
		// res.status(500).send({ code: 500, error: error.message });
	}
});

// crear estudiante: http://localhost:3000/read?rut=17338575-4
app.get('/create', async (req, res) => {
	try {
		const { rut, nombre, curso, nivel } = req.query;

		const estudiante = await createStudent(rut, nombre, curso, nivel);
		// console.log('28: ', estudiante.error);
		if (estudiante.error) throw estudiante.error; // ejecuta error si el usuario ya existe.

		res.status(201).json({
			// pinta el nuevo usuario
			code: 201,
			message: `Se ha agregado el estudiante ${rut} ${nombre}`,
			estudiante: estudiante,
		});
	} catch (error) {
		res.status(400).send({ code: 400, error: error.message });
		// res.status(500).send({ code: 500, error: error.message });
	}
});

// actualizar estudiante: http://localhost:3000/update?rut=22333444-5&nombre=Juan González&curso=Guitarra&nivel=1
app.get('/update', async (req, res) => {
	try {
		const { rut, nombre, curso, nivel } = req.query;
		const estudiante = await updateStudent(rut, nombre, curso, nivel);

		if (estudiante.error) throw estudiante.error;

		res.status(201).json({
			// pinta el nuevo usuario
			code: 201,
			message: `Se ha actualizado el estudiante ${rut} ${nombre}`,
			estudiante: estudiante,
		});
	} catch (error) {
		res.status(404).send({ code: 404, error: error.message });
		// res.status(500).send({ code: 500, error: error.message });
	}
});

// eliminar estudiante: http://localhost:3000/delete?rut=17494363-k
app.get('/delete', async (req, res) => {
	try {
		const rut = req.query.rut; // aquí se pasan los parametros que vienen del cliente (postman, tc, navegador web)
		const estudiante = await deleteStudent(rut); // se ejecuta la funcion delete con el parametro rut.
		if (estudiante.error) throw estudiante.error; // antes de borrar preguntamos si el usuario existe en la base de datos
		res.status(200).json({
			// muestra el usuario elminado.
			code: 200,
			message: `Se ha eliminado el estudiante`,
			estudiante: estudiante,
		});
	} catch (error) {
		res.status(404).json({ code: 404, error: error.message });
		// res.status(500).json({ code: 500, error: error.message });
	}
});

app.listen(PORT, () => {
	console.log(`Escuchando en el puerto ${PORT}`);
});
