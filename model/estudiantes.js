const { pool } = require('../utils/conn');

// traer todos los estudiantes
const getStudents = async () => {
	const query = {
		text: 'SELECT rut, nombre, curso, nivel FROM estudiante',
	};
	try {
		const client = await pool.connect();
		const students = await client.query(query);
		client.release();
		return students.rows;
	} catch (error) {
		console.log({ error: error.message });
		return {};
	}
};

//
const createStudents = async () => {
	const query = {
		text: 'INSERT INTO estudiante (rut, nombre, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *',
		values: [rut, nombre, curso, nivel],
	};
	try {
		const client = await pool.connect();
		const students = await client.query(query);
		client.release();
		return students.rows[0];
	} catch (error) {
		console.log({ error: error.message });
		return {};
	}
};

module.exports = {
	getStudents,
	createStudents,
};
