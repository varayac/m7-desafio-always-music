const { pool } = require('../utils/conn');

// Mostrar todos los estudiantes
const getStudents = async () => {
	const query = {
		text: 'SELECT rut, nombre, curso, nivel FROM estudiante',
	};
	try {
		const client = await pool.connect();
		const estudiantes = await client.query(query);
		if (estudiantes.rows.length === []) throw new Error('La base de datos no tiene registros');
		client.release();
		return estudiantes.rows;
	} catch (error) {
		console.log('ERROR getStudents: ', { error: error.message });
		return { error };
	}
};

// Mostrar un estudiante
const getStudentByRut = async (rut) => {
	const getById = {
		text: 'SELECT rut FROM estudiante WHERE rut = $1',
		values: [rut],
	};
	const query = {
		text: 'SELECT rut, nombre, curso, nivel FROM estudiante WHERE rut=$1',
		values: [rut],
	};
	try {
		const client = await pool.connect();
		const validacion = await client.query(getById);
		// validacion con mensaje personalizado.
		if (validacion.rows.length === 0) {
			throw new Error('El registro no existe en la base de datos!');
		}
		const estudiante = await client.query(query);
		client.release();
		return estudiante.rows[0];
	} catch (error) {
		console.log('ERROR getStudentByRut: ', { error: error.message });
		return { error };
	}
};

// Insertar nuevo estudiante.
const createStudent = async (rut, nombre, curso, nivel) => {
	// Consulta si el usuario ya existe en la BD.
	const getById = {
		text: 'SELECT rut FROM estudiante WHERE rut = $1',
		values: [rut],
	};
	const query = {
		text: 'INSERT INTO estudiante (rut, nombre, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *',
		values: [rut, nombre, curso, nivel],
	};
	try {
		const client = await pool.connect();
		const validacion = await client.query(getById);
		// validacion con mensaje personalizado.
		if (validacion.rows.length > 0) throw new Error('Registro ya existe en la base de datos');
		const estudiante = await client.query(query);
		client.release();
		return estudiante.rows[0];
	} catch (error) {
		console.log('ERROR createStudent: ', { error: error.message });
		return { error }; // acá se pasa el error del throw new error linea 53
	}
};

// Actualizar estudiente
const updateStudent = async (rut, nombre, curso, nivel) => {
	// busca al usuario por rut en DB.
	const getById = {
		text: 'SELECT rut FROM estudiante WHERE rut = $1',
		values: [rut],
	};
	// actualiza usuario en DB.
	const query = {
		text: 'UPDATE estudiante SET nombre=$2, curso=$3, nivel=$4 WHERE rut=$1 RETURNING *',
		values: [rut, nombre, curso, nivel],
	};
	try {
		const client = await pool.connect();
		const validacion = await client.query(getById);
		// Consulta si el usuario existe en la BD.
		if (validacion.rows.length === 0) {
			throw new Error('El registro no existe en la base de datos.');
		}
		const estudiante = await client.query(query);
		// console.log(estudiante);
		client.release();
		return estudiante.rows[0];
	} catch (error) {
		console.log('ERROR updateStudent: ', { error: error.message });
		return { error };
	}
};

// Eliminar estudiante
const deleteStudent = async (rut) => {
	const getById = {
		text: 'SELECT rut FROM estudiante WHERE rut = $1',
		values: [rut],
	};
	const query = {
		text: 'DELETE FROM estudiante WHERE rut=$1 RETURNING *',
		values: [rut],
	};
	try {
		const client = await pool.connect();
		const validacion = await client.query(getById);
		// Consulta si el usuario existe en la BD.
		if (validacion.rows.length === 0) {
			throw new Error('El registro no existe en base de datos');
		}

		const estudiante = await client.query(query);
		client.release();
		return estudiante.rows[0];
	} catch (error) {
		console.log('ERROR deleteStudent: ', { error: error.message });
		return { error };
	}
};

module.exports = {
	getStudents,
	createStudent,
	updateStudent,
	deleteStudent,
	getStudentByRut,
};
