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
		// ejecutamos nuestro controlador
		const estudiantes = await getStudents();
		// ejecuta el error si los usuarios no existen
		if (estudiantes.error) throw estudiantes.error;
		// enviamos una respuesta personalizada al cliente como json
		res.status(200).json({
			code: 200,
			message: `Listado de estudiantes`,
			estudiantes: estudiantes,
		});
	} catch (error) {
		// pintamos mensaje de error obtenido en linea throw estudiante.error;
		res.status(404).send({ code: 404, error: error.message });
		// res.status(500).send({ code: 500, error: error.message });
	}
});

// Mostar un estudiante por rut: http://localhost:3000/read?rut=11222333-4
app.get('/read', async (req, res) => {
	try {
		// toma los query params desde la url
		const rut = req.query.rut;
		// ejecutamos nuestro controlador pasando los valores obtenidos en query params
		const estudiante = await getStudentByRut(rut);
		// ejecuta el error si el usuario no existe
		if (estudiante.error) throw estudiante.error;
		// enviamos una respuesta personalizada al cliente como json
		res.status(200).json({
			code: 200,
			message: `Estudiante encontrado`,
			estudiante: estudiante,
		});
	} catch (error) {
		// pintamos mensaje de error obtenido en linea throw estudiante.error;
		res.status(404).send({ code: 404, error: error.message });
		// res.status(500).send({ code: 500, error: error.message });
	}
});

// crear estudiante: http://localhost:3000/read?rut=17338575-4
app.get('/create', async (req, res) => {
	try {
		// toma los query params desde la url
		const { rut, nombre, curso, nivel } = req.query;
		// ejecutamos nuestro controlador pasando los valores obtenidos en query params
		const estudiante = await createStudent(rut, nombre, curso, nivel);
		// console.log('63: ', estudiante.error);
		// ejecuta el error si el usuario ya existe
		if (estudiante.error) throw estudiante.error;
		// enviamos una respuesta personalizada al cliente como json
		res.status(201).json({
			// pinta el nuevo usuario
			code: 201,
			message: `Se ha agregado el estudiante ${rut} ${nombre}`,
			estudiante: estudiante,
		});
	} catch (error) {
		// pintamos mensaje de error obtenido en linea throw estudiante.error;
		res.status(400).send({ code: 400, error: error.message });
		// res.status(500).send({ code: 500, error: error.message });
	}
});

// actualizar estudiante: http://localhost:3000/update?rut=22333444-5&nombre=Juan González&curso=Guitarra&nivel=1
app.get('/update', async (req, res) => {
	try {
		// toma los query params desde la url mediante el requerimiento
		const { rut, nombre, curso, nivel } = req.query;
		// ejecutamos nuestro controlador pasando los valores obtenidos en query params
		const estudiante = await updateStudent(rut, nombre, curso, nivel);
		// ejecuta el error si el usuario ya existe
		if (estudiante.error) throw estudiante.error;
		// enviamos una respuesta personalizada al cliente como json
		res.status(201).json({
			// pinta el nuevo usuario
			code: 201,
			message: `Se ha actualizado el estudiante ${rut} ${nombre}`,
			estudiante: estudiante,
		});
	} catch (error) {
		// pintamos mensaje de error obtenido en linea throw estudiante.error;
		res.status(404).send({ code: 404, error: error.message });
		// res.status(500).send({ code: 500, error: error.message });
	}
});

// eliminar estudiante: http://localhost:3000/delete?rut=17494363-k
app.get('/delete', async (req, res) => {
	try {
		// aquí se pasan los parametros que vienen del cliente (postman, tc, navegador web)
		const rut = req.query.rut;
		// se ejecuta la funcion delete pasando el parametro rut al model delete.
		const estudiante = await deleteStudent(rut);
		// antes de borrar, preguntamos si el usuario existe en la base de datos
		if (estudiante.error) throw estudiante.error;
		// enviamos una respuesta personalizada al cliente como json
		res.status(200).json({
			code: 200,
			message: `Se ha eliminado el estudiante`,
			estudiante: estudiante,
		});
	} catch (error) {
		// pintamos mensaje de error obtenido en linea throw estudiante.error;
		res.status(404).json({ code: 404, error: error.message });
		// res.status(500).json({ code: 500, error: error.message });
	}
});

app.listen(PORT, () => {
	console.log(`Escuchando en el puerto ${PORT}`);
});
